import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TableMatch } from '@/types/matching';
import { MapPin, Users, Calendar, ChefHat, DollarSign, MessageSquare } from 'lucide-react';
import StarRating from './StarRating';
import { mockTableRatings } from '@/utils/mockReviews';

interface TableMatchCardProps {
  match: TableMatch;
  onViewDetails: () => void;
  onJoinTable: () => void;
}

export function TableMatchCard({ match, onViewDetails, onJoinTable }: TableMatchCardProps) {
  const navigate = useNavigate();
  const ratings = mockTableRatings[match.tableId] || { overall: 0, totalReviews: 0 };
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent Match';
    if (score >= 70) return 'Great Match';
    if (score >= 50) return 'Good Match';
    return 'Possible Match';
  };

  const handleViewReviews = () => {
    navigate(`/table/${match.tableId}/reviews`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={match.imageUrl} 
          alt={match.tableName}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full font-semibold ${getScoreColor(match.compatibilityScore)}`}>
          {match.compatibilityScore}% Match
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold">{match.tableName}</h3>
            {ratings.totalReviews > 0 && (
              <div 
                className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                onClick={handleViewReviews}
              >
                <StarRating rating={ratings.overall} size="sm" />
                <span className="text-xs text-gray-600">({ratings.totalReviews})</span>
              </div>
            )}
          </div>
          <p className={`text-sm font-medium ${getScoreColor(match.compatibilityScore).split(' ')[0]}`}>
            {getScoreLabel(match.compatibilityScore)}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {match.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {match.meetingSchedule}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {match.memberCount}/{match.maxMembers} members
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ChefHat className="w-4 h-4 mr-2" />
            {match.skillLevel} level
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            {match.budget}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Why it's a match:</p>
          <div className="flex flex-wrap gap-2">
            {match.matchReasons.slice(0, 3).map((reason, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {reason.icon} {reason.description}
              </Badge>
            ))}
          </div>
        </div>

        <Progress value={match.compatibilityScore} className="mb-4" />

        {ratings.totalReviews > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mb-2"
            onClick={handleViewReviews}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Read {ratings.totalReviews} Reviews
          </Button>
        )}

        <div className="flex gap-2">
          <Button onClick={onViewDetails} variant="outline" className="flex-1">
            View Details
          </Button>
          <Button onClick={onJoinTable} className="flex-1">
            Join Table
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}