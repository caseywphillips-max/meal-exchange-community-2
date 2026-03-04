import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import StarRating from './StarRating';
import { mockTableRatings } from '@/utils/mockReviews';

interface TableCardProps {
  table: {
    id: string;
    name: string;
    description: string;
    location: string;
    diet_type: string;
    budget_range: string;
    member_count: number;
    max_members: number;
    meetingSchedule?: string;
    dietary?: string[];
  };
  onJoin: () => void;
  joined?: boolean;
}

const TableCard: React.FC<TableCardProps> = ({ table, onJoin, joined = false }) => {
  const navigate = useNavigate();
  const ratings = mockTableRatings[table.id] || { overall: 0, totalReviews: 0 };

  const handleViewReviews = () => {
    navigate(`/table/${table.id}/reviews`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {table.name}
          </CardTitle>
          {ratings.totalReviews > 0 && (
            <div 
              className="flex items-center gap-1 cursor-pointer hover:opacity-80"
              onClick={handleViewReviews}
            >
              <StarRating rating={ratings.overall} size="sm" />
              <span className="text-sm text-gray-600">({ratings.totalReviews})</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm">{table.description}</p>
        
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {table.diet_type}
          </Badge>
          {table.dietary && table.dietary.map((diet) => (
            <Badge key={diet} variant="outline" className="text-xs">
              {diet}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{table.member_count}/{table.max_members}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{table.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>{table.budget_range}</span>
            </div>
            {table.meetingSchedule && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{table.meetingSchedule}</span>
              </div>
            )}
          </div>
        </div>

        {ratings.totalReviews > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={handleViewReviews}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            View {ratings.totalReviews} Reviews
          </Button>
        )}
        
        <Button 
          className={`w-full ${
            joined ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
          }`}
          disabled={joined || table.member_count >= table.max_members}
          onClick={onJoin}
        >
          {joined ? 'Joined' : table.member_count >= table.max_members ? 'Full' : 'Join Table'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TableCard;
