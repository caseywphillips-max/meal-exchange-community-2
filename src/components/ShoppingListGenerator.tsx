import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Trash2, Users, DollarSign, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  estimatedCost: number;
  assignedTo?: string;
  purchased: boolean;
}

export function ShoppingListGenerator({ tableId }: { tableId: string }) {
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Chicken Breast', quantity: '2', unit: 'lbs', category: 'Meat', estimatedCost: 12, assignedTo: 'Sarah', purchased: false },
    { id: '2', name: 'Pasta', quantity: '1', unit: 'box', category: 'Pantry', estimatedCost: 3, assignedTo: 'Mike', purchased: true },
    { id: '3', name: 'Tomatoes', quantity: '6', unit: 'pieces', category: 'Produce', estimatedCost: 4, purchased: false },
    { id: '4', name: 'Olive Oil', quantity: '1', unit: 'bottle', category: 'Pantry', estimatedCost: 8, purchased: false }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: 'Produce',
    estimatedCost: 0
  });

  const categories = ['Produce', 'Meat', 'Dairy', 'Pantry', 'Beverages', 'Other'];
  const members = ['Sarah', 'Mike', 'Emma', 'John'];

  const handleAddItem = () => {
    if (!newItem.name) return;

    const item: ShoppingItem = {
      id: Date.now().toString(),
      ...newItem,
      purchased: false
    };

    setItems([...items, item]);
    setNewItem({ name: '', quantity: '', unit: '', category: 'Produce', estimatedCost: 0 });
    toast({
      title: "Item Added",
      description: `${newItem.name} added to shopping list`
    });
  };

  const handleTogglePurchased = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleAssignMember = (itemId: string, member: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, assignedTo: member } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);
  const purchasedCount = items.filter(item => item.purchased).length;

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping List Generator
          </CardTitle>
          <CardDescription>
            Create and manage shopping lists for your table
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{items.length}</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{purchasedCount}</p>
              <p className="text-sm text-muted-foreground">Purchased</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">${totalCost}</p>
              <p className="text-sm text-muted-foreground">Est. Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">${(totalCost / members.length).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Per Person</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
              <Input
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              />
              <Input
                placeholder="Unit"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Cost"
                value={newItem.estimatedCost}
                onChange={(e) => setNewItem({...newItem, estimatedCost: parseFloat(e.target.value) || 0})}
              />
              <Button onClick={handleAddItem}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                <h3 className="font-semibold mb-2">{category}</h3>
                <div className="space-y-2">
                  {categoryItems.map(item => (
                    <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border ${item.purchased ? 'bg-muted opacity-60' : ''}`}>
                      <Checkbox
                        checked={item.purchased}
                        onCheckedChange={() => handleTogglePurchased(item.id)}
                      />
                      <div className="flex-1">
                        <span className={item.purchased ? 'line-through' : ''}>
                          {item.name} - {item.quantity} {item.unit}
                        </span>
                      </div>
                      <Badge variant="outline">${item.estimatedCost}</Badge>
                      <select
                        className="text-sm border rounded px-2 py-1"
                        value={item.assignedTo || ''}
                        onChange={(e) => handleAssignMember(item.id, e.target.value)}
                      >
                        <option value="">Unassigned</option>
                        {members.map(member => (
                          <option key={member} value={member}>{member}</option>
                        ))}
                      </select>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share with Table
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}