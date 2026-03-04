import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewFormProps {
  tableId: string;
  tableName: string;
  onSubmit?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ tableId, tableName, onSubmit }) => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [ratings, setRatings] = useState({
    overall: 0,
    mealQuality: 0,
    atmosphere: 0,
    organization: 0
  });
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ratings.overall === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide an overall rating",
        variant: "destructive"
      });
      return;
    }
    // Send notification to table host (simulated)
    addNotification({
      userId: 'host123', // Would be actual host ID
      type: 'review_received',
      priority: 'high',
      title: 'New Review Received',
      message: `${user?.email || 'A member'} rated ${tableName} ${ratings.overall} stars`,
      actionUrl: `/table/${tableId}/reviews`,
      actionLabel: 'View Review',
      metadata: {
        tableId,
        tableName,
        reviewerId: user?.id,
        reviewerName: user?.email,
        rating: ratings.overall
      }
    });

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    // Reset form
    setRatings({
      overall: 0,
      mealQuality: 0,
      atmosphere: 0,
      organization: 0
    });
    setComment('');
    setImages([]);
    
    if (onSubmit) onSubmit();
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const mockImage = `https://picsum.photos/200/200?random=${Date.now()}`;
    setImages([...images, mockImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review for {tableName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Overall Rating*</Label>
              <StarRating
                rating={ratings.overall}
                interactive
                size="lg"
                onRatingChange={(rating) => setRatings({...ratings, overall: rating})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Meal Quality</Label>
                <StarRating
                  rating={ratings.mealQuality}
                  interactive
                  onRatingChange={(rating) => setRatings({...ratings, mealQuality: rating})}
                />
              </div>
              
              <div>
                <Label>Atmosphere</Label>
                <StarRating
                  rating={ratings.atmosphere}
                  interactive
                  onRatingChange={(rating) => setRatings({...ratings, atmosphere: rating})}
                />
              </div>
              
              <div>
                <Label>Organization</Label>
                <StarRating
                  rating={ratings.organization}
                  interactive
                  onRatingChange={(rating) => setRatings({...ratings, organization: rating})}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this dinner table..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Add Photos</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt={`Upload ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleImageUpload}
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-gray-400"
              >
                <Camera className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;