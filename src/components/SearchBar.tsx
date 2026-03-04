import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Utensils, DollarSign, Leaf } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietary, setDietary] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (cuisine) params.append('cuisine', cuisine);
    if (dietary) params.append('dietary', dietary);
    if (budget) params.append('budget', budget);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-6 -mt-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Select value={cuisine} onValueChange={setCuisine}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Cuisine Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="thai">Thai</SelectItem>
              <SelectItem value="american">American</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Select value={dietary} onValueChange={setDietary}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Dietary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Restrictions</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten Free</SelectItem>
              <SelectItem value="dairy-free">Dairy Free</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">$ (Under $20)</SelectItem>
              <SelectItem value="medium">$$ ($20-40)</SelectItem>
              <SelectItem value="high">$$$ ($40-60)</SelectItem>
              <SelectItem value="premium">$$$$ ($60+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
          <Search className="mr-2 h-4 w-4" />
          Find Tables
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;