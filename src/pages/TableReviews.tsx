import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Users, Star } from 'lucide-react';
import StarRating from '@/components/StarRating';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import { mockReviews, mockTableRatings } from '@/utils/mockReviews';
import { useAuth } from '@/contexts/AuthContext';

const TableReviews: React.FC = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [, setShowReviewForm] = useState(false);
  
  const tableReviews = mockReviews.filter(r => r.tableId === tableId);
  const ratings = mockTableRatings[tableId || ''] || {
    overall: 0,
    mealQuality: 0,
    atmosphere: 0,
    organization: 0,
    totalReviews: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  };

  const tableName = tableReviews[0]?.tableName || 'Table';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{tableName} Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold">{ratings.overall.toFixed(1)}</div>
                <div>
                  <StarRating rating={ratings.overall} size="lg" />
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {ratings.totalReviews} reviews
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Meal Quality</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={ratings.mealQuality} size="sm" />
                    <span className="text-sm">{ratings.mealQuality.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Atmosphere</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={ratings.atmosphere} size="sm" />
                    <span className="text-sm">{ratings.atmosphere.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Organization</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={ratings.organization} size="sm" />
                    <span className="text-sm">{ratings.organization.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">All Reviews</TabsTrigger>
              <TabsTrigger value="write">Write Review</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews">
              <ReviewList reviews={tableReviews} />
            </TabsContent>
            
            <TabsContent value="write">
              {user ? (
                <ReviewForm
                  tableId={tableId || ''}
                  tableName={tableName}
                  onSubmit={() => setShowReviewForm(false)}
                />
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="mb-4">Please log in to write a review</p>
                    <Button onClick={() => navigate('/login')}>
                      Log In
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 mb-2">
                  <span className="text-sm w-4">{star}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Progress
                    value={
                      ratings.totalReviews > 0
                        ? (ratings.distribution[star as keyof typeof ratings.distribution] / ratings.totalReviews) * 100
                        : 0
                    }
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-gray-600 w-8">
                    {ratings.distribution[star as keyof typeof ratings.distribution]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Review Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">Most Praised:</span>
                  <p className="text-gray-600">Authentic recipes, welcoming atmosphere</p>
                </div>
                <div>
                  <span className="font-semibold">Recent Trend:</span>
                  <p className="text-gray-600">Rating improved by 0.3 in last month</p>
                </div>
                <div>
                  <span className="font-semibold">Best Feature:</span>
                  <p className="text-gray-600">Meal quality consistently rated highest</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tableReviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="flex items-center gap-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{review.userName}</p>
                      <p className="text-xs text-gray-600">{review.helpfulCount} helpful</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TableReviews;
