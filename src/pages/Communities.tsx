import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Calendar, ArrowLeft, Plus, Heart, Globe, Search, Star, ChefHat } from 'lucide-react';
import InviteFriendsForm from '@/components/InviteFriendsForm';
import { useToast } from '@/hooks/use-toast';

const Communities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchLocation, setSearchLocation] = useState('');
  const [showResults, setShowResults] = useState(false);

  const nearbyCommunities = [
    {
      id: 1,
      name: 'Bay Area Meal Preppers',
      location: 'San Francisco, CA',
      members: 234,
      rating: 4.8,
      cuisine: 'Mixed',
      nextMeeting: 'Saturday, 2pm'
    },
    {
      id: 2,
      name: 'Oakland Veggie Collective',
      location: 'Oakland, CA',
      members: 156,
      rating: 4.9,
      cuisine: 'Vegetarian',
      nextMeeting: 'Sunday, 11am'
    },
    {
      id: 3,
      name: 'Berkeley Healthy Eats',
      location: 'Berkeley, CA',
      members: 89,
      rating: 4.7,
      cuisine: 'Health-focused',
      nextMeeting: 'Friday, 6pm'
    },
    {
      id: 4,
      name: 'Peninsula Potluck Club',
      location: 'Palo Alto, CA',
      members: 178,
      rating: 4.6,
      cuisine: 'International',
      nextMeeting: 'Saturday, 5pm'
    }
  ];

  const handleSearch = () => {
    if (searchLocation.trim()) {
      setShowResults(true);
      toast({
        title: 'Searching...',
        description: `Finding communities near ${searchLocation}`,
      });
    }
  };

  const handleJoinCommunity = (community: typeof nearbyCommunities[0]) => {
    toast({
      title: 'Request Sent!',
      description: `Your request to join ${community.name} has been submitted.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Build Your Community</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Most people fail at meal prep because they get bored eating the same thing over and over, 
            well Knoshr is here to fix that problem. Join our mission to save money, limit food waste, 
            and meal prep with friends so you're always eating something new and exciting.
          </p>
          <div className="bg-orange-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-3">Why Invite Friends?</h2>
            <p className="text-orange-700 mb-4">
              When you invite friends to Knoshr, you're not just sharing an app - you're building a 
              community that transforms how we think about food. Together, we can reduce waste, 
              save money, and never get bored with our meals again.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800">Build Community</h3>
                  <p className="text-sm text-orange-700">Connect with neighbors who share your values</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800">Reduce Waste</h3>
                  <p className="text-sm text-orange-700">Help save the planet one meal at a time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800">Save Money</h3>
                  <p className="text-sm text-orange-700">Share costs and bulk buying power</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InviteFriendsForm />

        {/* Find Communities Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Find Communities Near You</h2>
          <div className="max-w-xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your city or zip code..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Communities near "{searchLocation}"</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyCommunities.map((community) => (
                <Card key={community.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{community.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {community.location}
                        </p>
                      </div>
                      <Badge variant="secondary">{community.cuisine}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {community.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {community.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {community.nextMeeting}
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleJoinCommunity(community)}
                    >
                      Request to Join
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                Find Your Local Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Join existing meal prep communities in your area</p>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setShowResults(true);
                  setSearchLocation('San Francisco');
                }}
              >
                Find Communities Near Me
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-orange-500" />
                Start Your Own Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Be a community leader and create your own meal prep group</p>
              <Button 
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={() => navigate('/join-table')}
              >
                <ChefHat className="h-4 w-4 mr-2" />
                Create Your Table
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Communities */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Chef's Circle SF</h3>
                <p className="text-sm text-gray-600 mb-3">Premium culinary experiences with professional chefs</p>
                <Badge className="bg-orange-500">500+ members</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Zero Waste Kitchen</h3>
                <p className="text-sm text-gray-600 mb-3">Sustainable cooking with minimal environmental impact</p>
                <Badge className="bg-green-500">320+ members</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Family Meal Network</h3>
                <p className="text-sm text-gray-600 mb-3">Kid-friendly recipes and family-oriented meal prep</p>
                <Badge className="bg-purple-500">450+ members</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities;
