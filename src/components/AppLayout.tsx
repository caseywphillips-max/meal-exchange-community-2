import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { cn } from '@/lib/utils';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar, currentPage, setCurrentPage } = useAppContext();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleNavigation = (page: string) => {
    const routeMap: Record<string, string> = {
      profile: '/profile',
      faq: '/faq',
      support: '/support',
      communities: '/communities',
      recipes: '/recipes',
      shop: '/shop',
    };

    const route = routeMap[page];
    if (route) {
      navigate(route);
      return;
    }
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'tables':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">My Tables</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600">Your joined tables will appear here.</p>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Meal Schedule</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600">Your meal prep schedule will appear here.</p>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600">Your table conversations will appear here.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600">Account and app settings will appear here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigation} />
      <Sidebar onNavigate={handleNavigation} />
      
      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Main content */}
      <main className={cn(
        "transition-all duration-300 ease-in-out p-6",
        sidebarOpen && !isMobile ? "ml-64" : "ml-0"
      )}>
        <div className="max-w-7xl mx-auto">
          {renderCurrentPage()}
          
          {/* Footer with FAQ and Support links */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-center space-x-6">
              <button 
                onClick={() => handleNavigation('faq')}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleNavigation('support')}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Support
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
