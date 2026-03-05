import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import FeatureButtons from './FeatureButtons';
import InviteCodeInput from './InviteCodeInput';


interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };


  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 py-6 sm:py-12 mb-4 sm:mb-8 rounded-lg">
      <div className="text-center mb-6 sm:mb-8 px-2 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
          Welcome to <span className="text-orange-500">Knoshr</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-5 sm:mb-6 leading-relaxed">
          Join meal prep communities, share delicious recipes, save money, reduce food waste and never eat the same thing twice!
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            onClick={handleGetStarted}
            disabled={loading}
          >
            {loading ? 'Signing in...' : user ? 'Go to Dashboard' : 'Get Started Today'}
          </Button>
          <InviteCodeInput />
        </div>
      </div>
      
      <FeatureButtons onNavigate={onNavigate} />
    </div>
  );
};

export default HeroSection;