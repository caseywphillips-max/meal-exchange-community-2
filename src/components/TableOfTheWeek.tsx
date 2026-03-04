import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Calendar, Utensils, DollarSign, Recycle, Heart } from 'lucide-react';

const TableOfTheWeek: React.FC = () => {
  const tableData = {
    name: "The Spice Squad",
    members: 12,
    location: "Downtown Portland",
    weeksRunning: 8,
    mealsDelivered: 384,
    dollarsSaved: 2840,
    foodWasteSaved: "127 lbs",
    moneyRaised: 450
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-orange-800 flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Table of the Week
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{tableData.name}</h3>
          <Badge variant="secondary" className="bg-orange-200 text-orange-800">
            Featured Community
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-600" />
            <span>{tableData.members} people</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-600" />
            <span>{tableData.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span>{tableData.weeksRunning} weeks running</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-orange-600" />
            <span>{tableData.mealsDelivered} meals delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>${tableData.dollarsSaved} saved</span>
          </div>
          <div className="flex items-center gap-2">
            <Recycle className="h-4 w-4 text-green-600" />
            <span>{tableData.foodWasteSaved} waste saved</span>
          </div>
        </div>
        
        <div className="text-center pt-2 border-t border-orange-200">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-700">
            <Heart className="h-4 w-4" />
            <span>${tableData.moneyRaised} raised to feed the hungry</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableOfTheWeek;