export type NotificationType = 
  | 'review_received'
  | 'table_invite'
  | 'upcoming_event'
  | 'member_joined'
  | 'member_left'
  | 'table_cancelled'
  | 'new_message'
  | 'reminder';

export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: {
    tableId?: string;
    tableName?: string;
    reviewerId?: string;
    reviewerName?: string;
    rating?: number;
    eventDate?: Date;
    inviteCode?: string;
  };
}

export interface NotificationPreferences {
  email: {
    enabled: boolean;
    reviewNotifications: boolean;
    inviteNotifications: boolean;
    eventReminders: boolean;
    marketingEmails: boolean;
    digestFrequency: 'immediate' | 'daily' | 'weekly';
  };
  push: {
    enabled: boolean;
    reviewNotifications: boolean;
    inviteNotifications: boolean;
    eventReminders: boolean;
  };
  inApp: {
    enabled: boolean;
    showBadge: boolean;
    playSound: boolean;
  };
}

export interface NotificationStats {
  unreadCount: number;
  totalCount: number;
  lastChecked: Date;
}