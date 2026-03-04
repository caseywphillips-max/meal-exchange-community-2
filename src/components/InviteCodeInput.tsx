import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useNotifications } from '@/contexts/NotificationContext';
import { getTableByInviteCode } from '@/data/tables';

const InviteCodeInput: React.FC = () => {
  const [inviteCode, setInviteCode] = useState('');
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const joinedTablesStorageKey = 'knoshr_joined_tables';

  const handleJoinTable = async () => {
    const normalizedCode = inviteCode.trim().toUpperCase();
    if (!normalizedCode) {
      toast({
        title: 'Error',
        description: 'Please enter an invite code',
        variant: 'destructive'
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to join a table with an invite code.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    const table = getTableByInviteCode(normalizedCode);
    if (!table) {
      toast({
        title: 'Invalid Invite Code',
        description: 'That code does not match any table. Please check and try again.',
        variant: 'destructive'
      });
      return;
    }

    const savedJoinedTables = localStorage.getItem(joinedTablesStorageKey);
    let joinedTableIds: string[] = [];
    if (savedJoinedTables) {
      try {
        const parsedJoinedTables = JSON.parse(savedJoinedTables);
        if (Array.isArray(parsedJoinedTables)) {
          joinedTableIds = parsedJoinedTables;
        }
      } catch {
        localStorage.removeItem(joinedTablesStorageKey);
      }
    }

    if (joinedTableIds.includes(table.id)) {
      toast({
        title: 'Already Joined',
        description: `You are already a member of ${table.name}.`,
      });
      navigate(`/join-table/${table.id}`);
      return;
    }

    const updatedJoinedTables = [...joinedTableIds, table.id];
    localStorage.setItem(joinedTablesStorageKey, JSON.stringify(updatedJoinedTables));

    addNotification({
      userId: session.user.id,
      type: 'member_joined',
      priority: 'medium',
      title: 'Successfully Joined Table',
      message: `You have joined ${table.name}. Check your schedule for upcoming events!`,
      actionUrl: `/join-table/${table.id}`,
      actionLabel: 'View Table',
      metadata: {
        tableId: table.id,
        tableName: table.name,
        inviteCode: normalizedCode,
      }
    });

    toast({
      title: 'Success!',
      description: `You joined ${table.name}.`,
    });
    setInviteCode('');
    navigate(`/join-table/${table.id}`);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <h3 className="font-semibold text-gray-800">Have an invite code?</h3>
          <p className="text-sm text-gray-600">Join an existing meal prep table</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void handleJoinTable()}
          />
          <Button 
            onClick={() => void handleJoinTable()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteCodeInput;
