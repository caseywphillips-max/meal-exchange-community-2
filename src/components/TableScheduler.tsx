import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, Users, Bell, ChefHat, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ScheduledEvent {
  id: string;
  date: Date;
  time: string;
  type: 'meal_prep' | 'shopping' | 'dinner' | 'planning';
  location: string;
  attendees: string[];
  notes?: string;
  reminder: boolean;
}

export function TableScheduler({ tableId }: { tableId: string }) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ScheduledEvent[]>([
    {
      id: '1',
      date: new Date(2024, 0, 20),
      time: '18:00',
      type: 'dinner',
      location: 'Sarah\'s House',
      attendees: ['Sarah', 'Mike', 'Emma', 'John'],
      reminder: true
    },
    {
      id: '2',
      date: new Date(2024, 0, 19),
      time: '10:00',
      type: 'shopping',
      location: 'Whole Foods Market',
      attendees: ['Mike', 'Emma'],
      reminder: true
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    type: 'dinner',
    time: '18:00',
    location: '',
    notes: '',
    reminder: true
  });

  const [showEventForm, setShowEventForm] = useState(false);

  const handleCreateEvent = () => {
    if (!selectedDate) return;

    const event: ScheduledEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      time: newEvent.time,
      type: newEvent.type as ScheduledEvent['type'],
      location: newEvent.location,
      attendees: [],
      notes: newEvent.notes,
      reminder: newEvent.reminder
    };

    setEvents([...events, event]);
    setShowEventForm(false);
    toast({
      title: "Event Scheduled",
      description: `${newEvent.type} scheduled for ${format(selectedDate, 'PPP')}`
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'dinner': return <ChefHat className="w-4 h-4" />;
      case 'shopping': return <ShoppingCart className="w-4 h-4" />;
      case 'meal_prep': return <Users className="w-4 h-4" />;
      default: return <CalendarDays className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'dinner': return 'bg-green-500';
      case 'shopping': return 'bg-blue-500';
      case 'meal_prep': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const dayEvents = events.filter(e => 
    selectedDate && e.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Table Calendar</CardTitle>
          <CardDescription>Schedule and manage your table events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: events.map(e => e.date)
            }}
            modifiersStyles={{
              hasEvent: { fontWeight: 'bold', textDecoration: 'underline' }
            }}
          />
          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEventForm(!showEventForm)}
            >
              Add Event
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {showEventForm && (
          <Card>
            <CardHeader>
              <CardTitle>New Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Event Type</Label>
                <Select value={newEvent.type} onValueChange={(v) => setNewEvent({...newEvent, type: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="meal_prep">Meal Prep</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                  placeholder="Additional notes..."
                />
              </div>
              <Button onClick={handleCreateEvent} className="w-full">
                Schedule Event
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'PPPP') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dayEvents.length === 0 ? (
              <p className="text-muted-foreground">No events scheduled</p>
            ) : (
              <div className="space-y-3">
                {dayEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted">
                    <div className={`p-2 rounded-full text-white ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold capitalize">{event.type.replace('_', ' ')}</span>
                        <Badge variant="outline">{event.time}</Badge>
                        {event.reminder && <Bell className="w-3 h-3 text-muted-foreground" />}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                      {event.attendees.length > 0 && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3" />
                          {event.attendees.join(', ')}
                        </p>
                      )}
                      {event.notes && (
                        <p className="text-sm mt-2">{event.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}