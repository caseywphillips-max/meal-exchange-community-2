import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/lib/supabase';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import TableCard from './TableCard';
import AdvertisementSection from './AdvertisementSection';
import TableOfTheWeek from './TableOfTheWeek';
import CelebrityChef from './CelebrityChef';
import { TableMatchCard } from './TableMatchCard';
import { calculateCompatibilityScore } from '@/utils/matchingAlgorithm';
import { UserPreferences, TableMatch } from '@/types/matching';
import { Button } from '@/components/ui/button';
import { Sparkles, Settings } from 'lucide-react';
import { defaultTables } from '@/data/tables';

interface DashboardProps {
  onNavigate: (page: string) => void;
}
const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [tables, setTables] = React.useState<any[]>([]);
  const [filteredTables, setFilteredTables] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showMatches, setShowMatches] = React.useState(false);
  const [matchedTables, setMatchedTables] = React.useState<TableMatch[]>([]);
  const [joinedTableIds, setJoinedTableIds] = React.useState<string[]>([]);
  const joinedTablesStorageKey = 'knoshr_joined_tables';
  
  // Mock user preferences - in production would come from user profile
  const mockUserPreferences: UserPreferences = {
    dietaryRestrictions: ['vegetarian'],
    cuisinePreferences: ['Italian', 'Asian', 'Mediterranean'],
    cookingSkillLevel: 'intermediate',
    preferredSchedule: ['Tuesday', 'Thursday', 'Saturday'],
    preferredGroupSize: 'medium',
    ageRange: '25-35',
    interests: ['meal prep', 'healthy eating', 'social dining'],
    budget: '$$',
    location: { lat: 37.7749, lng: -122.4194, radius: 10 },
    socialStyle: 'casual',
    hostingPreference: 'sometimes'
  };
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    fetchTables();
  }, []);

  React.useEffect(() => {
    const savedJoinedTables = localStorage.getItem(joinedTablesStorageKey);
    if (!savedJoinedTables) {
      return;
    }
    try {
      const parsedJoinedTables = JSON.parse(savedJoinedTables);
      if (Array.isArray(parsedJoinedTables)) {
        setJoinedTableIds(parsedJoinedTables);
      }
    } catch {
      localStorage.removeItem(joinedTablesStorageKey);
    }
  }, []);
  
  React.useEffect(() => {
    if (user && tables.length > 0) {
      calculateMatches(tables);
    }
  }, [user, tables]);

  const fetchTables = async () => {
    try {
      setLoading(true);

      setTables(defaultTables);
      setFilteredTables(defaultTables);
      
      // Calculate matches if user is logged in
      if (user) {
        calculateMatches(defaultTables);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      setTables([]);
      setFilteredTables([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatches = (allTables: any[]) => {
    const matches: TableMatch[] = allTables.map(table => {
      const { score, reasons } = calculateCompatibilityScore(mockUserPreferences, table);
      return {
        tableId: table.id,
        tableName: table.name,
        compatibilityScore: score,
        matchReasons: reasons,
        location: table.location,
        meetingSchedule: table.meetingSchedule,
        memberCount: table.member_count,
        maxMembers: table.max_members,
        cuisineType: table.cuisineType,
        averageAge: 28,
        skillLevel: table.skillLevel,
        budget: table.budget,
        dietary: table.dietary || [],
        imageUrl: table.imageUrl
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    
    setMatchedTables(matches);
  };

  const handleSearch = (query: string, filters: any) => {
    let filtered = Array.isArray(tables) ? [...tables] : [];
    
    if (query.trim()) {
      filtered = filtered.filter(table => 
        table.name?.toLowerCase().includes(query.toLowerCase()) ||
        table.description?.toLowerCase().includes(query.toLowerCase()) ||
        table.location?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.location && filters.location !== '') {
      filtered = filtered.filter(table => 
        table.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.dietary && filters.dietary !== '') {
      filtered = filtered.filter(table => 
        table.diet_type?.toLowerCase().includes(filters.dietary.toLowerCase())
      );
    }
    
    if (filters.budget && filters.budget !== '') {
      const budgetMap: { [key: string]: string } = {
        'under-5': '$0-5',
        '5-10': '$5-10',
        '10-15': '$10-15',
        '15-20': '$15-20',
        '20-plus': '$20+'
      };
      const budgetText = budgetMap[filters.budget] || filters.budget;
      filtered = filtered.filter(table => 
        table.budget_range?.includes(budgetText)
      );
    }
    
    setFilteredTables(filtered);
    
    if (query.trim() || filters.location || filters.dietary || filters.budget) {
      toast({
        title: 'Search Results',
        description: `Found ${filtered.length} table${filtered.length !== 1 ? 's' : ''} matching your criteria.`,
      });
    }
  };

  const handleJoinTable = async (tableId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to join a table.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    if (joinedTableIds.includes(tableId)) {
      toast({
        title: 'Already Joined',
        description: 'You are already a member of this table.',
      });
      navigate(`/join-table/${tableId}`);
      return;
    }

    // Find the table details
    const table = tables.find(t => t.id === tableId);
    if (table) {
      // Send notification for joining table
      addNotification({
        userId: user.id,
        type: 'member_joined',
        priority: 'medium',
        title: 'Successfully Joined Table',
        message: `You have joined ${table.name}. Check your schedule for upcoming events!`,
        actionUrl: `/join-table/${tableId}`,
        actionLabel: 'View Table',
        metadata: {
          tableId,
          tableName: table.name
        }
      });
    }

    const updatedJoinedTables = [...joinedTableIds, tableId];
    setJoinedTableIds(updatedJoinedTables);
    localStorage.setItem(joinedTablesStorageKey, JSON.stringify(updatedJoinedTables));
    navigate(`/join-table/${tableId}`);
  };

  return (
    <div className="space-y-8">
      {!user && <HeroSection onNavigate={onNavigate} />}
      
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          {user && (
            <div className="flex gap-2">
              <Button
                onClick={() => setShowMatches(!showMatches)}
                variant={showMatches ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {showMatches ? 'Show All Tables' : 'Show Matches'}
              </Button>
              <Button
                onClick={() => onNavigate('profile')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Preferences
              </Button>
            </div>
          )}
        </div>

        {user && showMatches && matchedTables.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Perfect Matches</h2>
                <p className="text-gray-600 mt-1">Tables recommended based on your preferences</p>
              </div>
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                AI Powered
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedTables.slice(0, 6).map(match => (
                <TableMatchCard
                  key={match.tableId}
                  match={match}
                  onViewDetails={() => {
                    toast({
                      title: 'Table Details',
                      description: `Viewing details for ${match.tableName}`,
                    });
                  }}
                  onJoinTable={() => handleJoinTable(match.tableId)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <TableOfTheWeek />
          <CelebrityChef />
        </div>
        
        {!showMatches && (
          <>
            <h2 className="text-xl font-bold">
              {user && matchedTables.length > 0 ? 'All Available Tables' : 'Browse Tables'}
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(Array.isArray(filteredTables) ? filteredTables : []).map(table => (
                  <TableCard 
                    key={table.id}
                    table={table}
                    onJoin={() => handleJoinTable(table.id)}
                    joined={joinedTableIds.includes(table.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <AdvertisementSection />
    </div>
  );
};

export default Dashboard;
