import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, MapPin } from 'lucide-react';

const AdvertisementSection: React.FC = () => {
  const weeklyDeals = [
    {
      id: 1,
      business: 'FreshMeal Co.',
      type: 'Meal Prep Service',
      deal: '20% off first order',
      description: 'Premium meal prep with organic ingredients',
      validUntil: 'Dec 31, 2024',
      location: 'Citywide Delivery'
    },
    {
      id: 2,
      business: 'GreenGrocer Market',
      type: 'Grocery Store',
      deal: 'Buy 2 Get 1 Free on Organic Produce',
      description: 'Fresh organic fruits and vegetables',
      validUntil: 'This Sunday',
      location: 'Downtown & Midtown'
    },
    {
      id: 3,
      business: 'Protein Palace',
      type: 'Meal Prep Service',
      deal: 'Free delivery on orders $50+',
      description: 'High-protein meals for fitness enthusiasts',
      validUntil: 'Dec 28, 2024',
      location: 'Metro Area'
    }
  ];

  const getTypeColor = (type: string) => {
    if (type === 'Meal Prep Service') {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    } else if (type === 'Grocery Store') {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-gray-50 py-8 px-4 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Weekly Deals & Offers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeklyDeals.map(deal => (
            <Card key={deal.id} className="hover:shadow-lg transition-shadow relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{deal.business}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`absolute top-4 right-4 ${getTypeColor(deal.type)}`}
                  >
                    {deal.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <p className="font-semibold text-orange-800">{deal.deal}</p>
                </div>
                <p className="text-gray-600 text-sm">{deal.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Valid until {deal.validUntil}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{deal.location}</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Claim Deal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;