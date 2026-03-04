import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, Users, DollarSign, Search, Filter, ArrowLeft, ChefHat, BookOpen, Utensils, Heart, Star, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recipe {
  id: number;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  costPerServing: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  cuisine: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  rating: number;
  reviews: number;
}

const Recipes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      description: "A healthy and colorful bowl packed with vegetables, feta cheese, and protein-rich quinoa",
      prepTime: "15 min",
      cookTime: "20 min",
      servings: 6,
      costPerServing: "$3.50",
      difficulty: "Easy",
      tags: ["Vegetarian", "Gluten-Free", "High-Protein"],
      cuisine: "Mediterranean",
      calories: 420,
      protein: "18g",
      carbs: "52g",
      fat: "16g",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      ingredients: ["2 cups quinoa", "1 cucumber, diced", "1 cup cherry tomatoes", "1/2 cup feta cheese", "1/4 cup olive oil", "Fresh herbs"],
      instructions: ["Cook quinoa according to package", "Chop vegetables", "Mix all ingredients", "Drizzle with olive oil", "Season to taste"],
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      title: "Chicken Teriyaki Meal Prep",
      description: "Sweet and savory chicken with rice and steamed vegetables - perfect for weekly meal prep",
      prepTime: "20 min",
      cookTime: "25 min",
      servings: 8,
      costPerServing: "$4.25",
      difficulty: "Medium",
      tags: ["High-Protein", "Dairy-Free"],
      cuisine: "Asian",
      calories: 480,
      protein: "35g",
      carbs: "45g",
      fat: "14g",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
      ingredients: ["2 lbs chicken breast", "1/2 cup teriyaki sauce", "4 cups rice", "2 cups broccoli", "1 cup carrots"],
      instructions: ["Marinate chicken in teriyaki", "Cook rice", "Grill or bake chicken", "Steam vegetables", "Portion into containers"],
      rating: 4.9,
      reviews: 256
    },
    {
      id: 3,
      title: "Vegan Buddha Bowl",
      description: "Nutritious plant-based bowl with roasted chickpeas, sweet potato, and tahini dressing",
      prepTime: "15 min",
      cookTime: "30 min",
      servings: 4,
      costPerServing: "$3.00",
      difficulty: "Easy",
      tags: ["Vegan", "Gluten-Free", "High-Fiber"],
      cuisine: "International",
      calories: 380,
      protein: "14g",
      carbs: "58g",
      fat: "12g",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      ingredients: ["2 cans chickpeas", "2 sweet potatoes", "2 cups kale", "1/4 cup tahini", "Lemon juice", "Spices"],
      instructions: ["Roast chickpeas and sweet potato", "Massage kale with olive oil", "Make tahini dressing", "Assemble bowls", "Drizzle with dressing"],
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      title: "Beef Stir Fry with Vegetables",
      description: "Quick and flavorful beef stir fry loaded with colorful vegetables",
      prepTime: "15 min",
      cookTime: "15 min",
      servings: 6,
      costPerServing: "$5.50",
      difficulty: "Medium",
      tags: ["High-Protein", "Low-Carb", "Dairy-Free"],
      cuisine: "Asian",
      calories: 350,
      protein: "28g",
      carbs: "18g",
      fat: "20g",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
      ingredients: ["1.5 lbs beef sirloin", "2 bell peppers", "1 cup snap peas", "Soy sauce", "Ginger", "Garlic"],
      instructions: ["Slice beef thinly", "Prep vegetables", "Stir fry beef first", "Add vegetables", "Season with sauce"],
      rating: 4.6,
      reviews: 178
    },
    {
      id: 5,
      title: "Greek Chicken Salad",
      description: "Fresh and light salad with grilled chicken, olives, and creamy feta dressing",
      prepTime: "20 min",
      cookTime: "15 min",
      servings: 4,
      costPerServing: "$4.00",
      difficulty: "Easy",
      tags: ["High-Protein", "Gluten-Free", "Keto-Friendly"],
      cuisine: "Mediterranean",
      calories: 320,
      protein: "32g",
      carbs: "12g",
      fat: "18g",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      ingredients: ["1 lb chicken breast", "Mixed greens", "Cucumber", "Tomatoes", "Feta cheese", "Kalamata olives"],
      instructions: ["Grill chicken with Greek seasoning", "Chop vegetables", "Crumble feta", "Assemble salads", "Add dressing"],
      rating: 4.8,
      reviews: 145
    },
    {
      id: 6,
      title: "Vegetable Curry with Rice",
      description: "Aromatic and warming curry packed with vegetables and served over fluffy rice",
      prepTime: "15 min",
      cookTime: "35 min",
      servings: 8,
      costPerServing: "$2.75",
      difficulty: "Medium",
      tags: ["Vegan", "Gluten-Free", "Budget-Friendly"],
      cuisine: "Indian",
      calories: 340,
      protein: "10g",
      carbs: "52g",
      fat: "12g",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
      ingredients: ["Mixed vegetables", "Coconut milk", "Curry paste", "Basmati rice", "Onion", "Garlic"],
      instructions: ["Sauté onion and garlic", "Add curry paste", "Add vegetables and coconut milk", "Simmer until tender", "Serve over rice"],
      rating: 4.5,
      reviews: 92
    },
    {
      id: 7,
      title: "Salmon with Roasted Vegetables",
      description: "Omega-rich salmon fillets with a medley of roasted seasonal vegetables",
      prepTime: "10 min",
      cookTime: "25 min",
      servings: 4,
      costPerServing: "$7.50",
      difficulty: "Easy",
      tags: ["High-Protein", "Gluten-Free", "Keto-Friendly", "Omega-3"],
      cuisine: "American",
      calories: 450,
      protein: "38g",
      carbs: "22g",
      fat: "24g",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
      ingredients: ["4 salmon fillets", "Asparagus", "Cherry tomatoes", "Zucchini", "Olive oil", "Lemon"],
      instructions: ["Season salmon", "Prep vegetables", "Roast vegetables at 400°F", "Add salmon halfway through", "Finish with lemon"],
      rating: 4.9,
      reviews: 203
    },
    {
      id: 8,
      title: "Turkey Taco Bowls",
      description: "Healthy twist on tacos with lean ground turkey and all the fixings",
      prepTime: "15 min",
      cookTime: "20 min",
      servings: 6,
      costPerServing: "$3.75",
      difficulty: "Easy",
      tags: ["High-Protein", "Gluten-Free"],
      cuisine: "Mexican",
      calories: 410,
      protein: "30g",
      carbs: "38g",
      fat: "16g",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
      ingredients: ["1.5 lbs ground turkey", "Black beans", "Corn", "Salsa", "Rice", "Avocado"],
      instructions: ["Brown turkey with taco seasoning", "Cook rice", "Warm beans and corn", "Assemble bowls", "Top with salsa and avocado"],
      rating: 4.7,
      reviews: 167
    },
    {
      id: 9,
      title: "Pasta Primavera",
      description: "Classic Italian pasta loaded with fresh spring vegetables in a light garlic sauce",
      prepTime: "15 min",
      cookTime: "20 min",
      servings: 6,
      costPerServing: "$2.50",
      difficulty: "Easy",
      tags: ["Vegetarian", "Budget-Friendly"],
      cuisine: "Italian",
      calories: 380,
      protein: "12g",
      carbs: "62g",
      fat: "10g",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
      ingredients: ["1 lb pasta", "Zucchini", "Bell peppers", "Cherry tomatoes", "Garlic", "Parmesan"],
      instructions: ["Cook pasta al dente", "Sauté vegetables", "Add garlic and olive oil", "Toss with pasta", "Top with parmesan"],
      rating: 4.4,
      reviews: 78
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDietary = dietaryFilter === 'all' || 
                          recipe.tags.some(tag => tag.toLowerCase().includes(dietaryFilter.toLowerCase()));
    
    const matchesCuisine = cuisineFilter === 'all' || 
                          recipe.cuisine.toLowerCase() === cuisineFilter.toLowerCase();
    
    const matchesBudget = budgetFilter === 'all' ||
                         (budgetFilter === 'under-3' && parseFloat(recipe.costPerServing.replace('$', '')) < 3) ||
                         (budgetFilter === '3-5' && parseFloat(recipe.costPerServing.replace('$', '')) >= 3 && parseFloat(recipe.costPerServing.replace('$', '')) <= 5) ||
                         (budgetFilter === 'over-5' && parseFloat(recipe.costPerServing.replace('$', '')) > 5);
    
    return matchesSearch && matchesDietary && matchesCuisine && matchesBudget;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    toast({
      title: favorites.includes(id) ? 'Removed from Favorites' : 'Added to Favorites',
      description: favorites.includes(id) ? 'Recipe removed from your favorites' : 'Recipe saved to your favorites',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Recipes</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover and share meal prep recipes with our community. Save time, money, and eat delicious food every day.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-3">Why Our Recipe Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800">Community Focus</h3>
                <p className="text-sm text-green-700">Connect with local meal preppers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800">Meal Prep Ready</h3>
                <p className="text-sm text-green-700">Recipes designed for batch cooking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800">Budget Friendly</h3>
                <p className="text-sm text-green-700">Cost-effective ingredient lists</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Utensils className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800">Tested & Rated</h3>
                <p className="text-sm text-green-700">Community-verified recipes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Dietary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dietary</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              <SelectItem value="keto">Keto-Friendly</SelectItem>
              <SelectItem value="dairy-free">Dairy-Free</SelectItem>
            </SelectContent>
          </Select>
          <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="american">American</SelectItem>
            </SelectContent>
          </Select>
          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="under-3">Under $3/serving</SelectItem>
              <SelectItem value="3-5">$3-5/serving</SelectItem>
              <SelectItem value="over-5">Over $5/serving</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filteredRecipes.length} recipes found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </button>
                <Badge className={`absolute top-3 left-3 ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{recipe.cuisine}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                    <span className="text-xs text-gray-500">({recipe.reviews})</span>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{recipe.title}</CardTitle>
                <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.prepTime}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {recipe.costPerServing}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>{recipe.calories} cal</span>
                  <span className="text-gray-300">|</span>
                  <span>P: {recipe.protein}</span>
                  <span className="text-gray-300">|</span>
                  <span>C: {recipe.carbs}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-green-500" />
                Share Your Recipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Upload your favorite meal prep recipes and help others discover new flavors</p>
              <Button 
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={() => toast({ title: 'Coming Soon', description: 'Recipe sharing will be available soon!' })}
              >
                Start Sharing Recipes
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Your Saved Recipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {favorites.length > 0 
                  ? `You have ${favorites.length} saved recipe${favorites.length > 1 ? 's' : ''}`
                  : 'Save recipes by clicking the heart icon'}
              </p>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  if (favorites.length > 0) {
                    setSearchTerm('');
                    setDietaryFilter('all');
                    setCuisineFilter('all');
                    setBudgetFilter('all');
                    toast({ title: 'Showing Favorites', description: 'Scroll up to see your saved recipes' });
                  } else {
                    toast({ title: 'No Favorites Yet', description: 'Click the heart icon on recipes to save them' });
                  }
                }}
              >
                View Saved Recipes ({favorites.length})
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <DialogTitle className="text-2xl">{selectedRecipe.title}</DialogTitle>
                <DialogDescription>{selectedRecipe.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Prep: {selectedRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Cook: {selectedRecipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{selectedRecipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{selectedRecipe.costPerServing}/serving</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Nutrition per Serving</h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-orange-500">{selectedRecipe.calories}</p>
                      <p className="text-xs text-gray-500">Calories</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-500">{selectedRecipe.protein}</p>
                      <p className="text-xs text-gray-500">Protein</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">{selectedRecipe.carbs}</p>
                      <p className="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-500">{selectedRecipe.fat}</p>
                      <p className="text-xs text-gray-500">Fat</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-700">{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      toggleFavorite(selectedRecipe.id);
                    }}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${favorites.includes(selectedRecipe.id) ? 'fill-current' : ''}`} />
                    {favorites.includes(selectedRecipe.id) ? 'Saved' : 'Save Recipe'}
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({ title: 'Link Copied', description: 'Recipe link copied to clipboard' });
                    }}
                  >
                    Share Recipe
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recipes;
