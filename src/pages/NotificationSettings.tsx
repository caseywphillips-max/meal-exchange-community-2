import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Clock, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';

const NotificationSettings: React.FC = () => {
  const { preferences, updatePreferences } = useNotifications();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (category: string, setting: string, value: boolean) => {
    setLocalPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
    setHasChanges(true);
  };

  const handleDigestFrequency = (value: string) => {
    setLocalPreferences(prev => ({
      ...prev,
      email: {
        ...prev.email,
        digestFrequency: value as 'immediate' | 'daily' | 'weekly'
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    setHasChanges(false);
    toast.success('Notification preferences updated successfully');
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-gray-600 mt-2">Manage how you receive notifications from Knoshr</p>
        </div>

        <Tabs defaultValue="email" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="push">
              <Smartphone className="h-4 w-4 mr-2" />
              Push
            </TabsTrigger>
            <TabsTrigger value="inapp">
              <Bell className="h-4 w-4 mr-2" />
              In-App
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose which notifications you want to receive via email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-enabled"
                    checked={localPreferences.email.enabled}
                    onCheckedChange={(checked) => handleToggle('email', 'enabled', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-reviews">Review Notifications</Label>
                      <p className="text-sm text-gray-500">When someone reviews your table</p>
                    </div>
                    <Switch
                      id="email-reviews"
                      checked={localPreferences.email.reviewNotifications}
                      onCheckedChange={(checked) => handleToggle('email', 'reviewNotifications', checked)}
                      disabled={!localPreferences.email.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-invites">Table Invitations</Label>
                      <p className="text-sm text-gray-500">When you're invited to join a table</p>
                    </div>
                    <Switch
                      id="email-invites"
                      checked={localPreferences.email.inviteNotifications}
                      onCheckedChange={(checked) => handleToggle('email', 'inviteNotifications', checked)}
                      disabled={!localPreferences.email.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-events">Event Reminders</Label>
                      <p className="text-sm text-gray-500">Upcoming table events and dinners</p>
                    </div>
                    <Switch
                      id="email-events"
                      checked={localPreferences.email.eventReminders}
                      onCheckedChange={(checked) => handleToggle('email', 'eventReminders', checked)}
                      disabled={!localPreferences.email.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-marketing">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">News, updates, and special offers</p>
                    </div>
                    <Switch
                      id="email-marketing"
                      checked={localPreferences.email.marketingEmails}
                      onCheckedChange={(checked) => handleToggle('email', 'marketingEmails', checked)}
                      disabled={!localPreferences.email.enabled}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">Email Digest Frequency</Label>
                  <Select
                    value={localPreferences.email.digestFrequency}
                    onValueChange={handleDigestFrequency}
                    disabled={!localPreferences.email.enabled}
                  >
                    <SelectTrigger id="digest-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Immediate
                        </div>
                      </SelectItem>
                      <SelectItem value="daily">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Daily Digest
                        </div>
                      </SelectItem>
                      <SelectItem value="weekly">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Weekly Digest
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="push">
            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage push notifications on your devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <Switch
                    id="push-enabled"
                    checked={localPreferences.push.enabled}
                    onCheckedChange={(checked) => handleToggle('push', 'enabled', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-reviews">Review Notifications</Label>
                      <p className="text-sm text-gray-500">New reviews and ratings</p>
                    </div>
                    <Switch
                      id="push-reviews"
                      checked={localPreferences.push.reviewNotifications}
                      onCheckedChange={(checked) => handleToggle('push', 'reviewNotifications', checked)}
                      disabled={!localPreferences.push.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-invites">Table Invitations</Label>
                      <p className="text-sm text-gray-500">Instant alerts for table invites</p>
                    </div>
                    <Switch
                      id="push-invites"
                      checked={localPreferences.push.inviteNotifications}
                      onCheckedChange={(checked) => handleToggle('push', 'inviteNotifications', checked)}
                      disabled={!localPreferences.push.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-events">Event Reminders</Label>
                      <p className="text-sm text-gray-500">Don't miss your dinner events</p>
                    </div>
                    <Switch
                      id="push-events"
                      checked={localPreferences.push.eventReminders}
                      onCheckedChange={(checked) => handleToggle('push', 'eventReminders', checked)}
                      disabled={!localPreferences.push.enabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inapp">
            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>
                  Configure how notifications appear within the app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inapp-enabled">Enable In-App Notifications</Label>
                    <p className="text-sm text-gray-500">Show notifications while using the app</p>
                  </div>
                  <Switch
                    id="inapp-enabled"
                    checked={localPreferences.inApp.enabled}
                    onCheckedChange={(checked) => handleToggle('inApp', 'enabled', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-badge">Show Badge Counter</Label>
                      <p className="text-sm text-gray-500">Display unread count on notification bell</p>
                    </div>
                    <Switch
                      id="inapp-badge"
                      checked={localPreferences.inApp.showBadge}
                      onCheckedChange={(checked) => handleToggle('inApp', 'showBadge', checked)}
                      disabled={!localPreferences.inApp.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-sound">Play Sound</Label>
                      <p className="text-sm text-gray-500">Play a sound for important notifications</p>
                    </div>
                    <Switch
                      id="inapp-sound"
                      checked={localPreferences.inApp.playSound}
                      onCheckedChange={(checked) => handleToggle('inApp', 'playSound', checked)}
                      disabled={!localPreferences.inApp.enabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset Changes
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;