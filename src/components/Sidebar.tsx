import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Users, Calendar, MessageCircle, Settings, X, User, ShoppingBag, BookOpen, HelpCircle, HeadphonesIcon } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { sidebarOpen, toggleSidebar, currentPage, setCurrentPage } = useAppContext();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard', route: '/' },
    { icon: User, label: 'My Profile', page: 'profile', route: '/profile' },
    { icon: Users, label: 'Communities', page: 'communities', route: '/communities' },
    { icon: BookOpen, label: 'Recipes', page: 'recipes', route: '/recipes' },
    { icon: Calendar, label: 'My Tables', page: 'tables', route: null },
    { icon: MessageCircle, label: 'Messages', page: 'messages', route: null },
    { icon: ShoppingBag, label: 'Knoshr Shop', page: 'shop', route: '/shop' },
    { icon: Settings, label: 'Settings', page: 'settings', route: '/settings' },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: 'FAQ', page: 'faq', route: '/faq' },
    { icon: HeadphonesIcon, label: 'Support', page: 'support', route: '/support' },
  ];

  const handleItemClick = (page: string, route: string | null) => {
    if (route) {
      navigate(route);
    } else {
      setCurrentPage(page);
      if (onNavigate) {
        onNavigate(page);
      }
    }
    toggleSidebar();
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col",
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <Button
                key={index}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-orange-500 hover:bg-orange-600"
                )}
                onClick={() => handleItemClick(item.page, item.route)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-2">
          {bottomItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-gray-600"
                onClick={() => handleItemClick(item.page, item.route)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
