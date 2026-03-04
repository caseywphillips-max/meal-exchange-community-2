import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Textarea } from '@/components/ui/textarea';

interface PendingMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  requestDate: string;
  message?: string;
  dietaryRestrictions?: string[];
  experience?: string;
}

export function MemberApproval({ tableId }: { tableId: string }) {
  const { toast } = useToast();
  const [pendingMembers, setPendingMembers] = useState<PendingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    fetchPendingMembers();
  }, [tableId]);

  const fetchPendingMembers = async () => {
    try {
      // Mock data for demonstration
      setPendingMembers([
        {
          id: '1',
          userId: 'user1',
          userName: 'Sarah Johnson',
          userEmail: 'sarah@example.com',
          requestDate: '2024-01-15',
          message: 'I love cooking Italian food and would love to join your table!',
          dietaryRestrictions: ['Vegetarian'],
          experience: 'Intermediate'
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Mike Chen',
          userEmail: 'mike@example.com',
          requestDate: '2024-01-16',
          message: 'Looking forward to sharing meals and recipes with everyone.',
          experience: 'Beginner'
        }
      ]);
    } catch (error) {
      console.error('Error fetching pending members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (memberId: string) => {
    try {
      // Here you would update the database
      toast({
        title: "Member Approved",
        description: "The member has been added to your table."
      });
      setPendingMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve member.",
        variant: "destructive"
      });
    }
  };

  const handleReject = async (memberId: string) => {
    try {
      // Here you would update the database
      toast({
        title: "Request Declined",
        description: "The membership request has been declined."
      });
      setPendingMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process request.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Loading pending requests...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pending Member Requests</CardTitle>
          <CardDescription>
            Review and approve new members for your table
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingMembers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No pending member requests
            </p>
          ) : (
            <div className="space-y-4">
              {pendingMembers.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={member.userAvatar} />
                        <AvatarFallback>
                          {member.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold">{member.userName}</h4>
                          <p className="text-sm text-muted-foreground">{member.userEmail}</p>
                        </div>
                        {member.message && (
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm">{member.message}</p>
                          </div>
                        )}
                        <div className="flex gap-2">
                          {member.dietaryRestrictions?.map((restriction) => (
                            <Badge key={restriction} variant="secondary">
                              {restriction}
                            </Badge>
                          ))}
                          {member.experience && (
                            <Badge variant="outline">{member.experience} Cook</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Requested {new Date(member.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMember(member.id)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleApprove(member.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(member.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {selectedMember === member.id && (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        placeholder="Send a message with your decision..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        rows={3}
                      />
                      <Button size="sm" onClick={() => setSelectedMember(null)}>
                        Send Message
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}