import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from './StarRating';
import { ThumbsUp, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import { Review } from '@/types/reviews';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
  showTableName?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, showTableName = false }) => {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  const toggleExpanded = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const toggleHelpful = (reviewId: string) => {
    const newHelpful = new Set(helpfulReviews);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
    }
    setHelpfulReviews(newHelpful);
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const isExpanded = expandedReviews.has(review.id);
        const isHelpful = helpfulReviews.has(review.id);
        const shouldTruncate = review.comment.length > 200;

        return (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.userName}</span>
                      {showTableName && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{review.tableName}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                      </span>
                    </div>

                    {(review.mealRating > 0 || review.atmosphereRating > 0 || review.organizationRating > 0) && (
                      <div className="flex flex-wrap gap-4 mb-3 text-sm">
                        {review.mealRating > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Meal:</span>
                            <StarRating rating={review.mealRating} size="sm" />
                          </div>
                        )}
                        {review.atmosphereRating > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Atmosphere:</span>
                            <StarRating rating={review.atmosphereRating} size="sm" />
                          </div>
                        )}
                        {review.organizationRating > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Organization:</span>
                            <StarRating rating={review.organizationRating} size="sm" />
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-gray-700 mb-3">
                      {shouldTruncate && !isExpanded
                        ? `${review.comment.substring(0, 200)}...`
                        : review.comment}
                    </p>

                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpanded(review.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>Show less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Read more <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    )}

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-90"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleHelpful(review.id)}
                        className={isHelpful ? 'text-blue-600' : ''}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Helpful ({review.helpfulCount + (isHelpful ? 1 : 0)})
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReviewList;