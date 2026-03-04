import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChefHat, Star, Trophy } from 'lucide-react';

const CelebrityChef: React.FC = () => {
  const chefData = {
    name: "Chef Maria Rodriguez",
    bio: "James Beard Award winner specializing in sustainable cooking and zero-waste techniques.",
    image: "/placeholder.svg",
    specialty: "Zero-Waste Cooking",
    achievement: "Reduced food waste by 40% in participating tables"
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-purple-800 flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Celebrity Chef of the Week
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-purple-200">
            <AvatarImage src={chefData.image} alt={chefData.name} />
            <AvatarFallback className="bg-purple-200 text-purple-800 text-lg font-bold">
              {chefData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{chefData.name}</h3>
            <Badge variant="secondary" className="bg-purple-200 text-purple-800 mb-2">
              {chefData.specialty}
            </Badge>
            <p className="text-sm text-gray-600 leading-relaxed">{chefData.bio}</p>
          </div>
        </div>
        
        <div className="bg-white/50 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
            <Trophy className="h-4 w-4" />
            <span>Current Impact:</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{chefData.achievement}</p>
        </div>
        
        <div className="text-center text-xs text-purple-600 font-medium">
          <div className="flex items-center justify-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            <span>Tables compete for celebrity appearances through philanthropy & community service</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CelebrityChef;