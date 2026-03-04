import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Users, MapPin, DollarSign, ChefHat, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface TableConfig {
  name: string;
  description: string;
  cuisine: string;
  inviteCode: string;
  maxMembers: number;
  meetingDay: string;
  meetingTime: string;
  location: string;
  costPerMeal: number;
  rules: string[];
  requiresApproval: boolean;
  isPrivate: boolean;
}

export function TableCreationWizard({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<TableConfig>({
    name: '',
    description: '',
    cuisine: '',
    inviteCode: '',
    maxMembers: 6,
    meetingDay: '',
    meetingTime: '',
    location: '',
    costPerMeal: 15,
    rules: [''],
    requiresApproval: true,
    isPrivate: false
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const inviteCode = config.inviteCode.trim().toUpperCase();
      const { error } = await supabase
        .from('meal_tables')
        .insert({
          name: config.name,
          description: config.description,
          cuisine_type: config.cuisine,
          max_members: config.maxMembers,
          meeting_day: config.meetingDay,
          meeting_time: config.meetingTime,
          location: config.location,
          cost_per_meal: config.costPerMeal,
          ...(inviteCode ? { invite_code: inviteCode } : {}),
          requires_approval: config.requiresApproval,
          is_private: config.isPrivate,
          created_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Table Created!",
        description: "Your meal table has been created successfully."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create table. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 h-2 mx-1 rounded ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">Step {step} of 4</p>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Let's start with the basics of your meal table</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Table Name</Label>
              <Input
                id="name"
                value={config.name}
                onChange={(e) => setConfig({...config, name: e.target.value})}
                placeholder="e.g., Downtown Dinner Club"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={config.description}
                onChange={(e) => setConfig({...config, description: e.target.value})}
                placeholder="Describe your table's vibe and what makes it special..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <Select value={config.cuisine} onValueChange={(v) => setConfig({...config, cuisine: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed/Varied</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule & Location</CardTitle>
            <CardDescription>When and where will your table meet?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="day">Meeting Day</Label>
              <Select value={config.meetingDay} onValueChange={(v) => setConfig({...config, meetingDay: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time">Meeting Time</Label>
              <Input
                id="time"
                type="time"
                value={config.meetingTime}
                onChange={(e) => setConfig({...config, meetingTime: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={config.location}
                onChange={(e) => setConfig({...config, location: e.target.value})}
                placeholder="e.g., Rotating between members' homes"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Members & Cost</CardTitle>
            <CardDescription>Configure membership and pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="inviteCode">Invite Code</Label>
              <Input
                id="inviteCode"
                value={config.inviteCode}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    inviteCode: e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '')
                  })
                }
                placeholder="e.g., DOWNTOWN8"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Members can use this code to join your table directly.
              </p>
            </div>
            <div>
              <Label htmlFor="members">Maximum Members</Label>
              <Input
                id="members"
                type="number"
                min="2"
                max="20"
                value={config.maxMembers}
                onChange={(e) => setConfig({...config, maxMembers: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="cost">Estimated Cost Per Meal ($)</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                step="0.50"
                value={config.costPerMeal}
                onChange={(e) => setConfig({...config, costPerMeal: parseFloat(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="approval"
                  checked={config.requiresApproval}
                  onCheckedChange={(c) => setConfig({...config, requiresApproval: c as boolean})}
                />
                <Label htmlFor="approval">Require approval for new members</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="private"
                  checked={config.isPrivate}
                  onCheckedChange={(c) => setConfig({...config, isPrivate: c as boolean})}
                />
                <Label htmlFor="private">Make table private (invite-only)</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Create</CardTitle>
            <CardDescription>Review your table configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p><strong>Name:</strong> {config.name}</p>
              <p><strong>Cuisine:</strong> {config.cuisine}</p>
              <p><strong>Schedule:</strong> {config.meetingDay} at {config.meetingTime}</p>
              <p><strong>Location:</strong> {config.location}</p>
              <p><strong>Max Members:</strong> {config.maxMembers}</p>
              <p><strong>Cost/Meal:</strong> ${config.costPerMeal}</p>
              <p><strong>Invite Code:</strong> {config.inviteCode || 'Not set'}</p>
              <p><strong>Approval Required:</strong> {config.requiresApproval ? 'Yes' : 'No'}</p>
              <p><strong>Private:</strong> {config.isPrivate ? 'Yes' : 'No'}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleBack} disabled={step === 1}>
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Create Table</Button>
        )}
      </div>
    </div>
  );
}
