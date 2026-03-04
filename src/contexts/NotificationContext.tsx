import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification, NotificationPreferences, NotificationStats } from '@/types/notifications';
import { toast } from 'sonner';

interface NotificationContextType {
  notifications: Notification[];
  preferences: NotificationPreferences;
  stats: NotificationStats;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAll: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      enabled: true,
      reviewNotifications: true,
      inviteNotifications: true,
      eventReminders: true,
      marketingEmails: false,
      digestFrequency: 'immediate'
    },
    push: {
      enabled: true,
      reviewNotifications: true,
      inviteNotifications: true,
      eventReminders: true
    },
    inApp: {
      enabled: true,
      showBadge: true,
      playSound: true
    }
  });

  const [stats, setStats] = useState<NotificationStats>({
    unreadCount: 0,
    totalCount: 0,
    lastChecked: new Date()
  });

  // Update stats when notifications change
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    setStats({
      unreadCount,
      totalCount: notifications.length,
      lastChecked: new Date()
    });
  }, [notifications]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for high priority notifications
    if (preferences.inApp.enabled && notification.priority === 'high') {
      toast.success(notification.title, {
        description: notification.message,
        action: notification.actionUrl ? {
          label: notification.actionLabel || 'View',
          onClick: () => window.location.href = notification.actionUrl
        } : undefined
      });
    }

    // Play sound if enabled
    if (preferences.inApp.playSound && notification.priority !== 'low') {
      // Play notification sound (would need actual audio file)
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
    }
  }, [preferences]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updatePreferences = useCallback((newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  }, []);

  // Simulate receiving notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const sampleNotifications = [
          {
            userId: 'user123',
            type: 'review_received' as const,
            priority: 'high' as const,
            title: 'New Review',
            message: 'Sarah Chen rated your Italian Night table 5 stars!',
            actionUrl: '/reviews',
            metadata: { rating: 5, reviewerName: 'Sarah Chen' }
          },
          {
            userId: 'user123',
            type: 'table_invite' as const,
            priority: 'high' as const,
            title: 'Table Invitation',
            message: 'You\'ve been invited to join Weekend Brunch Club',
            actionUrl: '/tables',
            metadata: { tableName: 'Weekend Brunch Club' }
          },
          {
            userId: 'user123',
            type: 'upcoming_event' as const,
            priority: 'medium' as const,
            title: 'Event Reminder',
            message: 'Thai Cooking Night starts in 2 hours',
            actionUrl: '/schedule',
            metadata: { tableName: 'Thai Cooking Night', eventDate: new Date() }
          }
        ];
        
        const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      preferences,
      stats,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
      updatePreferences
    }}>
      {children}
    </NotificationContext.Provider>
  );
};