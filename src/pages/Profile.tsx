import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ArrowLeft, Award, ChefHat, Heart, MessageSquare } from 'lucide-react';
import StarRating from '@/components/StarRating';
import ReviewList from '@/components/ReviewList';
import { mockReviews, mockMemberRatings } from '@/utils/mockReviews';
import { UserRatings } from '@/types/reviews';
import { supabase } from '@/lib/supabase';

interface ProfileProps {
  onNavigate?: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (data) {
      setProfile(data);
    } else {
      // Create default profile
      const newProfile = {
        user_id: userId,
        full_name: user?.user_metadata?.full_name || 'Chef User',
        rating: 4.8,
        meals_delivered: 127,
        specialties: ['Italian', 'Mediterranean', 'Healthy'],
        dietary_preferences: ['Vegetarian Friendly', 'Gluten-Free Options']
      };
      const { data: created } = await supabase
        .from('user_profiles')
        .insert(newProfile)
        .select()
        .single();
      setProfile(created);
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    } else {
      navigate('/');
    }
  };

  const favoriteDishesMock = [
    { name: 'Truffle Pasta', image: '/placeholder.svg', likes: 24 },
    { name: 'Grilled Salmon', image: '/placeholder.svg', likes: 18 },
    { name: 'Quinoa Bowl', image: '/placeholder.svg', likes: 31 }
  ];

  // Mock user reviews - in production, fetch from database
  const userReviews = mockReviews.filter(r => r.userId === 'user1').slice(0, 3);
  const memberRatings = mockMemberRatings.filter(r => r.toUserId === 'user1');
  
  const userRatingStats: UserRatings = {
    overall: 4.7,
    cookingSkill: 4.8,
    punctuality: 4.5,
    friendliness: 4.9,
    totalRatings: memberRatings.length
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleBack} variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          <div className="text-center py-12">
            <p className="text-gray-600">Please sign in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button onClick={handleBack} variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div className="grid gap-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    {(profile?.full_name || user?.user_metadata?.full_name || 'U')[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {profile?.full_name || user?.user_metadata?.full_name || 'Chef User'}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{profile?.rating || 4.8}</span>
                      <span className="text-gray-600">(23 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-5 w-5 text-orange-500" />
                      <span className="font-semibold">{profile?.meals_delivered || 127}</span>
                      <span className="text-gray-600">meals delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(profile?.specialties || ['Italian', 'Mediterranean', 'Healthy']).map((specialty: string, index: number) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dietary Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(profile?.dietary_preferences || ['Vegetarian Friendly', 'Gluten-Free Options']).map((pref: string, index: number) => (
                    <Badge key={index} variant="outline">{pref}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Favorite Dishes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorite Dishes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {favoriteDishesMock.map((dish, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold">{dish.name}</h3>
                    <p className="text-sm text-gray-600">{dish.likes} likes</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews and Ratings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Reviews & Ratings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="received" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="received">Received Ratings</TabsTrigger>
                  <TabsTrigger value="given">My Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="received" className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Member Rating</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Overall</p>
                        <div className="flex items-center gap-1">
                          <StarRating rating={userRatingStats.overall} size="sm" />
                          <span className="text-sm font-medium">{userRatingStats.overall}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cooking Skill</p>
                        <div className="flex items-center gap-1">
                          <StarRating rating={userRatingStats.cookingSkill} size="sm" />
                          <span className="text-sm font-medium">{userRatingStats.cookingSkill}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Punctuality</p>
                        <div className="flex items-center gap-1">
                          <StarRating rating={userRatingStats.punctuality} size="sm" />
                          <span className="text-sm font-medium">{userRatingStats.punctuality}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Friendliness</p>
                        <div className="flex items-center gap-1">
                          <StarRating rating={userRatingStats.friendliness} size="sm" />
                          <span className="text-sm font-medium">{userRatingStats.friendliness}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {memberRatings.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Recent Feedback</h4>
                      {memberRatings.map((rating) => (
                        <div key={rating.id} className="border-l-4 border-orange-400 pl-4 py-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{rating.fromUserName}</span>
                            <StarRating rating={rating.rating} size="sm" />
                          </div>
                          {rating.comment && (
                            <p className="text-sm text-gray-600">{rating.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">No ratings received yet</p>
                  )}
                </TabsContent>
                
                <TabsContent value="given">
                  {userReviews.length > 0 ? (
                    <ReviewList reviews={userReviews} showTableName={true} />
                  ) : (
                    <p className="text-gray-600 text-center py-8">You haven't written any reviews yet</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
