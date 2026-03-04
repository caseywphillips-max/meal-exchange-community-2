import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X, Plus } from 'lucide-react';

const InviteFriendsForm: React.FC = () => {
  const [emails, setEmails] = useState<string[]>(['', '']);
  const [senderEmail, setSenderEmail] = useState('');
  const { toast } = useToast();

  const addEmailField = () => {
    setEmails([...emails, '', '']);
  };

  const removeEmailField = (index: number) => {
    if (emails.length > 2) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSendInvites = () => {
    const validEmails = emails.filter(email => email.trim() && email.includes('@'));
    
    if (!senderEmail.trim() || !senderEmail.includes('@')) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }
    
    if (validEmails.length === 0) {
      toast({
        title: 'Error',
        description: 'Please enter at least one valid email address',
        variant: 'destructive'
      });
      return;
    }
    
    toast({
      title: 'Invites Sent!',
      description: `Sent ${validEmails.length} invitation(s) from ${senderEmail} to join your community`,
    });
    setEmails(['', '']);
    setSenderEmail('');
  };

  const emailPairs = [];
  for (let i = 0; i < emails.length; i += 2) {
    emailPairs.push(emails.slice(i, i + 2));
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-center text-orange-500">Invite Friends</CardTitle>
        <p className="text-sm text-gray-600 text-center">Build your meal prep community</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Your Email</label>
          <Input
            type="email"
            placeholder="your@example.com"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="mb-3"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Invite Friends</label>
          {emailPairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-2 gap-2 mb-2">
              {pair.map((email, emailIndex) => {
                const actualIndex = pairIndex * 2 + emailIndex;
                return (
                  <div key={actualIndex} className="flex gap-1">
                    <Input
                      type="email"
                      placeholder="friend@example.com"
                      value={email}
                      onChange={(e) => updateEmail(actualIndex, e.target.value)}
                    />
                    {emails.length > 2 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEmailField(actualIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addEmailField}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add More
          </Button>
          <Button 
            onClick={handleSendInvites}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            Send Invites
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteFriendsForm;