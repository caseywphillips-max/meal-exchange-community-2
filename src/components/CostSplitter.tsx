import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calculator, Users, TrendingUp, Receipt, CreditCard } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  category: string;
  splitBetween: string[];
}

interface MemberBalance {
  name: string;
  paid: number;
  owes: number;
  balance: number;
}

export function CostSplitter({ tableId }: { tableId: string }) {
  const members = ['Sarah', 'Mike', 'Emma', 'John'];
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Groceries for Italian Night',
      amount: 85.50,
      paidBy: 'Sarah',
      date: '2024-01-15',
      category: 'Groceries',
      splitBetween: members
    },
    {
      id: '2',
      description: 'Wine for dinner',
      amount: 45.00,
      paidBy: 'Mike',
      date: '2024-01-15',
      category: 'Beverages',
      splitBetween: members
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    paidBy: members[0],
    category: 'Groceries'
  });

  const calculateBalances = (): MemberBalance[] => {
    const balances: Record<string, MemberBalance> = {};
    
    members.forEach(member => {
      balances[member] = { name: member, paid: 0, owes: 0, balance: 0 };
    });

    expenses.forEach(expense => {
      const splitAmount = expense.amount / expense.splitBetween.length;
      
      balances[expense.paidBy].paid += expense.amount;
      
      expense.splitBetween.forEach(member => {
        balances[member].owes += splitAmount;
      });
    });

    Object.values(balances).forEach(balance => {
      balance.balance = balance.paid - balance.owes;
    });

    return Object.values(balances);
  };

  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount <= 0) return;

    const expense: Expense = {
      id: Date.now().toString(),
      ...newExpense,
      date: new Date().toISOString().split('T')[0],
      splitBetween: members
    };

    setExpenses([...expenses, expense]);
    setNewExpense({ description: '', amount: 0, paidBy: members[0], category: 'Groceries' });
  };

  const balances = calculateBalances();
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const getSettlements = () => {
    const settlements: { from: string; to: string; amount: number }[] = [];
    const balancesCopy = [...balances].sort((a, b) => a.balance - b.balance);
    
    let i = 0, j = balancesCopy.length - 1;
    
    while (i < j) {
      const debtor = balancesCopy[i];
      const creditor = balancesCopy[j];
      
      if (Math.abs(debtor.balance) < 0.01) {
        i++;
        continue;
      }
      if (Math.abs(creditor.balance) < 0.01) {
        j--;
        continue;
      }
      
      const amount = Math.min(Math.abs(debtor.balance), creditor.balance);
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(amount * 100) / 100
      });
      
      balancesCopy[i].balance += amount;
      balancesCopy[j].balance -= amount;
    }
    
    return settlements;
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Per Person</p>
                <p className="text-2xl font-bold">${(totalExpenses / members.length).toFixed(2)}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount || ''}
              onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newExpense.paidBy}
              onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
            >
              {members.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
            <Button onClick={handleAddExpense}>Add Expense</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Balances</CardTitle>
            <CardDescription>Who owes what</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {balances.map(balance => (
                <div key={balance.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{balance.name}</span>
                    <Badge variant={balance.balance >= 0 ? 'default' : 'destructive'}>
                      {balance.balance >= 0 ? '+' : ''}{balance.balance.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Paid: ${balance.paid.toFixed(2)} | Owes: ${balance.owes.toFixed(2)}
                  </div>
                  <Progress 
                    value={(balance.paid / totalExpenses) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settlements</CardTitle>
            <CardDescription>How to settle up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getSettlements().map((settlement, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{settlement.from}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{settlement.to}</span>
                  </div>
                  <Badge>${settlement.amount.toFixed(2)}</Badge>
                </div>
              ))}
              {getSettlements().length === 0 && (
                <p className="text-center text-muted-foreground py-4">All settled up!</p>
              )}
            </div>
            <Button className="w-full mt-4">
              <CreditCard className="w-4 h-4 mr-2" />
              Send Payment Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}