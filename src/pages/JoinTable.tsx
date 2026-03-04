import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, Calendar, DollarSign, ChefHat, Activity, ShoppingCart, Calculator, Settings } from 'lucide-react';
import { TableCreationWizard } from '@/components/TableCreationWizard';
import { MemberApproval } from '@/components/MemberApproval';
import { TableScheduler } from '@/components/TableScheduler';
import { ShoppingListGenerator } from '@/components/ShoppingListGenerator';
import { CostSplitter } from '@/components/CostSplitter';
import { TableAnalytics } from '@/components/TableAnalytics';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getTableById } from '@/data/tables';

const JoinTable = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const { toast } = useToast();
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryPreference: '',
    message: ''
  });
  const selectedTable = getTableById(tableId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Request Submitted!',
      description: 'We will review your application and get back to you soon.'
    });
    
    setTimeout(() => navigate('/'), 1500);
  };

  // If we have a tableId, show the table management interface
  if (tableId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="p-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{selectedTable?.name || 'Your Meal Table'}</h1>
            <p className="text-muted-foreground">Manage your table, schedule meals, and track expenses</p>
          </div>

          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
              <TabsTrigger value="schedule" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="hidden md:inline">Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="hidden md:inline">Members</span>
              </TabsTrigger>
              <TabsTrigger value="shopping" className="flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden md:inline">Shopping</span>
              </TabsTrigger>
              <TabsTrigger value="costs" className="flex items-center gap-1">
                <Calculator className="w-4 h-4" />
                <span className="hidden md:inline">Costs</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule">
              <TableScheduler tableId={tableId} />
            </TabsContent>

            <TabsContent value="members">
              <MemberApproval tableId={tableId} />
            </TabsContent>

            <TabsContent value="shopping">
              <ShoppingListGenerator tableId={tableId} />
            </TabsContent>

            <TabsContent value="costs">
              <CostSplitter tableId={tableId} />
            </TabsContent>

            <TabsContent value="analytics">
              <TableAnalytics tableId={tableId} />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Table Settings</CardTitle>
                  <CardDescription>Manage your table configuration and rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Table Name</Label>
                    <Input defaultValue={selectedTable?.name || 'My Meal Table'} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea defaultValue={selectedTable?.description || 'A friendly group that meets weekly to share meals and cooking experiences'} />
                  </div>
                  <div>
                    <Label>Meeting Schedule</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select defaultValue="friday">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                            <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  <div>
                    <Label>Table Rules</Label>
                    <Textarea 
                      rows={4}
                      defaultValue="1. Rotate hosting duties&#10;2. Notify 48 hours in advance if unable to attend&#10;3. Share recipes after each meal&#10;4. Respect dietary restrictions"
                    />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Otherwise show the join/create interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Join or Create a Table</CardTitle>
            <CardDescription className="text-center">Connect with others who love cooking and sharing meals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowCreateWizard(true)}
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Create New Table
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or join existing</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Preference</Label>
                <Select value={formData.dietaryPreference} onValueChange={(value) => setFormData({...formData, dietaryPreference: value})}>
                  <SelectTrigger><SelectValue placeholder="Select preference" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Why do you want to join?</Label>
                <Textarea id="message" rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">Submit Request</Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/')}>Cancel</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showCreateWizard} onOpenChange={setShowCreateWizard}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <TableCreationWizard onClose={() => setShowCreateWizard(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinTable;
