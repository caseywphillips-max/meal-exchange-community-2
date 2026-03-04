import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Users, DollarSign, Utensils, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');
  const [recipe, setRecipe] = useState('');
  const [store, setStore] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!groupSize || !budget || !recipe) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResult = `
🍽️ OPTIMIZED MEAL PLAN FOR ${groupSize} PEOPLE

📊 PORTION CALCULATIONS:
• Recipe scaled for ${groupSize} servings
• Estimated cost per person: $${(parseInt(budget) / parseInt(groupSize)).toFixed(2)}

🛒 SHOPPING LIST (${store || 'Generic Store'}):
• Protein: 2 lbs chicken breast ($8.99)
• Vegetables: Mixed bell peppers 3-pack ($4.49)
• Grains: 2 lb bag brown rice ($3.29)
• Pantry: Olive oil, spices ($6.99)

💡 MONEY-SAVING TIPS:
• Buy family packs and freeze portions
• Use store brand items (save 20%)
• Shop sales and use coupons

♻️ WASTE REDUCTION:
• Prep vegetables immediately after shopping
• Use vegetable scraps for stock
• Portion meals into containers for easy storage

🥘 COOKING EFFICIENCY:
• Batch cook proteins on Sunday
• Pre-cut vegetables for quick assembly
• Use one-pan methods to save cleanup time
      `;
      
      setResult(mockResult);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-500" />
              AI Meal Prep Assistant
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="groupSize">Group Size *</Label>
                  <Select value={groupSize} onValueChange={setGroupSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="6">6 people</SelectItem>
                      <SelectItem value="8">8 people</SelectItem>
                      <SelectItem value="10">10+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="budget">Total Budget *</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="$50"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="store">Preferred Store</Label>
                <Select value={store} onValueChange={setStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walmart">Walmart</SelectItem>
                    <SelectItem value="kroger">Kroger</SelectItem>
                    <SelectItem value="target">Target</SelectItem>
                    <SelectItem value="costco">Costco</SelectItem>
                    <SelectItem value="whole-foods">Whole Foods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="recipe">Recipe or Meal Type *</Label>
                <Textarea
                  id="recipe"
                  placeholder="Enter a recipe name or describe the type of meal you want to prepare..."
                  value={recipe}
                  onChange={(e) => setRecipe(e.target.value)}
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isGenerating ? 'Generating...' : 'Generate Optimized Plan'}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setResult('')}
                  variant="outline"
                  className="flex-1"
                >
                  Generate New Plan
                </Button>
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    toast({ title: 'Copied!', description: 'Plan copied to clipboard' });
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  Copy Plan
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;