import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, MapPin, Users, Utensils, DollarSign, Leaf, Clock } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  host: string;
  location: string;
  cuisine: string;
  dietary: string[];
  budget: string;
  spots: number;
  spotsAvailable: number;
  description: string;
  meetingSchedule: string;
  image: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [tables, setTables] = useState<Table[]>([]);
  const [filteredTables, setFilteredTables] = useState<Table[]>([]);
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [cuisine, setCuisine] = useState(searchParams.get('cuisine') || '');
  const [dietary, setDietary] = useState(searchParams.get('dietary') || '');
  const [budget, setBudget] = useState(searchParams.get('budget') || '');
  // Mock data - in production this would come from Supabase
  // Mock data - in production this would come from Supabase
  useEffect(() => {
    const mockTables: Table[] = [
      {
        id: '1',
        name: 'Italian Feast Night',
        host: 'Maria Rossi',
        location: 'Brooklyn, NY',
        meetingSchedule: 'Every Tuesday & Thursday, 7:00 PM',
        cuisine: 'Italian',
        dietary: ['vegetarian'],
        budget: 'medium',
        spots: 6,
        spotsAvailable: 2,
        description: 'Authentic Italian dinner with homemade pasta and tiramisu',
        image: '/api/placeholder/400/300'
      },
      {
        id: '2',
        name: 'Sushi Making Workshop',
        host: 'Ken Tanaka',
        location: 'Manhattan, NY',
        meetingSchedule: 'Wednesdays, 6:30 PM',
        cuisine: 'Japanese',
        dietary: ['gluten-free'],
        budget: 'high',
        spots: 8,
        spotsAvailable: 3,
        description: 'Learn to make sushi while enjoying dinner',
        image: '/api/placeholder/400/300'
      },
      {
        id: '3',
        name: 'Mexican Taco Tuesday',
        host: 'Carlos Martinez',
        location: 'Queens, NY',
        meetingSchedule: 'Every Tuesday, 6:00 PM',
        cuisine: 'Mexican',
        dietary: ['none'],
        budget: 'low',
        spots: 10,
        spotsAvailable: 5,
        description: 'Authentic street tacos with all the fixings',
        image: '/api/placeholder/400/300'
      },
      {
        id: '4',
        name: 'French Bistro Evening',
        host: 'Sophie Laurent',
        location: 'Brooklyn, NY',
        meetingSchedule: 'Fridays, 7:30 PM',
        cuisine: 'French',
        dietary: ['none'],
        budget: 'premium',
        spots: 4,
        spotsAvailable: 1,
        description: 'Classic French dishes in an intimate setting',
        image: '/api/placeholder/400/300'
      },
      {
        id: '5',
        name: 'Thai Street Food Night',
        host: 'Nong Khai',
        location: 'Astoria, NY',
        meetingSchedule: 'Mondays & Wednesdays, 6:00 PM',
        cuisine: 'Thai',
        dietary: ['vegan', 'gluten-free'],
        budget: 'low',
        spots: 8,
        spotsAvailable: 4,
        description: 'Authentic Thai street food experience with pad thai and more',
        image: '/api/placeholder/400/300'
      },
      {
        id: '6',
        name: 'Indian Curry Club',
        host: 'Raj Patel',
        location: 'Jersey City, NJ',
        meetingSchedule: 'Thursdays, 7:00 PM',
        cuisine: 'Indian',
        dietary: ['vegetarian', 'vegan'],
        budget: 'medium',
        spots: 6,
        spotsAvailable: 2,
        description: 'Variety of traditional curries with naan and rice',
        image: '/api/placeholder/400/300'
      },
      {
        id: '7',
        name: 'American BBQ Backyard',
        host: 'Mike Johnson',
        location: 'Brooklyn, NY',
        meetingSchedule: 'Saturdays, 5:00 PM',
        cuisine: 'American',
        dietary: ['none'],
        budget: 'medium',
        spots: 12,
        spotsAvailable: 7,
        description: 'Classic BBQ with ribs, brisket, and all the sides',
        image: '/api/placeholder/400/300'
      },
      {
        id: '8',
        name: 'Vegan Italian Night',
        host: 'Luna Verde',
        location: 'Manhattan, NY',
        meetingSchedule: 'Sundays, 6:30 PM',
        cuisine: 'Italian',
        dietary: ['vegan', 'dairy-free'],
        budget: 'medium',
        spots: 6,
        spotsAvailable: 3,
        description: 'Plant-based Italian classics that everyone will love',
        image: '/api/placeholder/400/300'
      }
    ];
    setTables(mockTables);
  }, []);

  useEffect(() => {
    let filtered = [...tables];
    
    if (location) {
      filtered = filtered.filter(t => 
        t.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (cuisine && cuisine !== 'all') {
      filtered = filtered.filter(t => 
        t.cuisine.toLowerCase() === cuisine.toLowerCase()
      );
    }
    
    if (dietary && dietary !== 'none') {
      filtered = filtered.filter(t => 
        t.dietary.includes(dietary)
      );
    }
    
    if (budget && budget !== 'all') {
      filtered = filtered.filter(t => t.budget === budget);
    }
    
    setFilteredTables(filtered);
  }, [location, cuisine, dietary, budget, tables]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is reactive based on state changes
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Find Your Table</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>Find the perfect meal table for you</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Enter city or zip"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cuisines</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="thai">Thai</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary</Label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Select value={dietary} onValueChange={setDietary}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select dietary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Restrictions</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten-free">Gluten Free</SelectItem>
                      <SelectItem value="dairy-free">Dairy Free</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="low">$ (Under $20)</SelectItem>
                    <SelectItem value="medium">$$ ($20-40)</SelectItem>
                    <SelectItem value="high">$$$ ($40-60)</SelectItem>
                    <SelectItem value="premium">$$$$ ($60+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredTables.length} table{filteredTables.length !== 1 ? 's' : ''} matching your criteria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTables.map((table) => (
            <Card key={table.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100" />
              <CardHeader>
                <CardTitle>{table.name}</CardTitle>
                <CardDescription>Hosted by {table.host}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {table.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-4 w-4" />
                    {table.meetingSchedule}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Utensils className="mr-2 h-4 w-4" />
                    {table.cuisine} Cuisine
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Leaf className="mr-2 h-4 w-4" />
                    {table.dietary.filter(d => d !== 'none').join(', ') || 'No dietary restrictions'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {table.budget === 'low' && '$ (Under $20)'}
                    {table.budget === 'medium' && '$$ ($20-40)'}
                    {table.budget === 'high' && '$$$ ($40-60)'}
                    {table.budget === 'premium' && '$$$$ ($60+)'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2 h-4 w-4" />
                    {table.spotsAvailable} of {table.spots} spots available
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{table.description}</p>
                <Button 
                  className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                  disabled={table.spotsAvailable === 0}
                >
                  {table.spotsAvailable === 0 ? 'Table Full' : 'Request to Join'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTables.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">No tables found matching your criteria.</p>
              <p className="text-gray-400">Try adjusting your search filters or check back later.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchResults;