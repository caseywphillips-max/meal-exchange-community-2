import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleCallback = async () => {
      // Get the hash fragment from the URL
      const hashFragment = window.location.hash;
      
      if (hashFragment) {
        // Parse the hash fragment for error or success
        const params = new URLSearchParams(hashFragment.substring(1));
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        
        if (error) {
          console.error('OAuth error:', error, errorDescription);
          // Redirect to login with error message
          navigate('/login?error=' + encodeURIComponent(errorDescription || error));
        } else {
          // Success - redirect to home or dashboard
          navigate('/');
        }
      } else {
        // If no hash fragment, redirect to home
        setTimeout(() => navigate('/'), 1000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Completing sign in...
          </h2>
          <p className="text-gray-600 text-center">
            Please wait while we redirect you to your account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthCallback;