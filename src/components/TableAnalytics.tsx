import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Calendar, DollarSign, ChefHat, Star, Activity, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TableAnalytics({ tableId }: { tableId: string }) {
  const monthlyData = [
    { month: 'Jan', meals: 4, cost: 240, attendance: 95 },
    { month: 'Feb', meals: 5, cost: 310, attendance: 88 },
    { month: 'Mar', meals: 4, cost: 255, attendance: 92 },
    { month: 'Apr', meals: 6, cost: 380, attendance: 97 }
  ];

  const cuisineData = [
    { name: 'Italian', value: 35, color: '#ef4444' },
    { name: 'Asian', value: 25, color: '#3b82f6' },
    { name: 'Mexican', value: 20, color: '#10b981' },
    { name: 'Mediterranean', value: 20, color: '#f59e0b' }
  ];

  const memberStats = [
    { name: 'Sarah', attendance: 100, hosted: 8, rating: 4.8 },
    { name: 'Mike', attendance: 92, hosted: 6, rating: 4.5 },
    { name: 'Emma', attendance: 88, hosted: 5, rating: 4.7 },
    { name: 'John', attendance: 95, hosted: 7, rating: 4.6 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Meals</p>
                <p className="text-2xl font-bold">19</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <ChefHat className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">93%</p>
                <p className="text-xs text-green-600">+5% from last month</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Cost/Meal</p>
                <p className="text-2xl font-bold">$15.80</p>
                <p className="text-xs text-red-600">+3% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Table Rating</p>
                <p className="text-2xl font-bold">4.7</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <Award className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Meals and costs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="meals" stroke="#3b82f6" name="Meals" />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" name="Attendance %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cuisine Distribution</CardTitle>
            <CardDescription>Types of meals prepared</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cuisineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cuisineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Performance</CardTitle>
          <CardDescription>Individual member statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {memberStats.map(member => (
              <div key={member.name} className="space-y-2 p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Hosted: {member.hosted} times</span>
                      <span>Rating: {member.rating}/5.0</span>
                    </div>
                  </div>
                  <Badge variant={member.attendance >= 95 ? 'default' : member.attendance >= 85 ? 'secondary' : 'destructive'}>
                    {member.attendance}% attendance
                  </Badge>
                </div>
                <Progress value={member.attendance} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Recent table activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: ChefHat, text: 'Sarah hosted Italian Night', time: '2 hours ago' },
              { icon: Users, text: 'New member request from Alex', time: '5 hours ago' },
              { icon: Calendar, text: 'Next meal scheduled for Friday', time: '1 day ago' },
              { icon: Star, text: 'Mike rated last meal 5 stars', time: '2 days ago' },
              { icon: DollarSign, text: 'Expenses settled for last week', time: '3 days ago' }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <activity.icon className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}