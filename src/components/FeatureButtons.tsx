import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ChefHat, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InviteFriendsForm from './InviteFriendsForm';
import AIAssistant from './AIAssistant';

interface FeatureButtonsProps {
  onNavigate: (page: string) => void;
}

const FeatureButtons: React.FC<FeatureButtonsProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [showInviteForm, setShowInviteForm] = React.useState(false);
  const [showAIAssistant, setShowAIAssistant] = React.useState(false);

  const features = [
    {
      icon: Users,
      title: 'Build Communities',
      description: 'Connect with like-minded food lovers in your area',
      action: () => {
        onNavigate('communities');
      }
    },
    {
      icon: ChefHat,
      title: 'Share Recipes',
      description: 'Exchange delicious meal prep ideas and techniques',
      action: () => {
        onNavigate('recipes');
      }
    },
    {
      icon: Calendar,
      title: 'Coordinate Meals',
      description: 'Plan and schedule meal swaps with your table',
      action: () => {
        onNavigate('schedule');
        toast({ title: 'Meal Coordination', description: 'Plan your meal prep schedule' });
      }
    },
    {
      icon: DollarSign,
      title: 'Save Money',
      description: 'Let our AI help you save money and stop food waste',
      action: () => {
        setShowAIAssistant(true);
      }
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-all cursor-pointer group" onClick={feature.action}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {showInviteForm && (
        <div className="mt-8">
          <InviteFriendsForm />
          <div className="text-center mt-4">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setShowInviteForm(false)}
            >
              Hide Invite Form
            </button>
          </div>
        </div>
      )}
      
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}
    </div>
  );
};

export default FeatureButtons;