import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ShoppingCart, Package, Truck, Star, ArrowLeft, Recycle, Plus, Minus, X, Check, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Knoshr Recycled Meal Containers (100-pack)',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400',
      description: '100% recycled BPA-free containers perfect for meal prep portions',
      badge: 'Best Seller',
      category: 'containers',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Insulated Cooler Bag - Knoshr Edition',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400',
      description: 'Keep your meals fresh during transport with our branded cooler bag',
      badge: 'New',
      category: 'bags',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Knoshr Community T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      description: 'Show your Knoshr pride with our comfortable organic cotton tee',
      badge: null,
      category: 'apparel',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Precision Serving Spoons Set',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      description: 'Stainless steel serving spoons with Knoshr branding',
      badge: null,
      category: 'utensils',
      rating: 4.5
    },
    {
      id: 5,
      name: 'Measuring Cups - Knoshr Pro Set',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400',
      description: 'Accurate measuring cups for perfect portion control',
      badge: null,
      category: 'utensils',
      rating: 4.6
    },
    {
      id: 6,
      name: 'Branded Silicone Spatula Set',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400',
      description: 'Heat-resistant spatulas with Knoshr logo',
      badge: null,
      category: 'utensils',
      rating: 4.4
    },
    {
      id: 7,
      name: 'Glass Food Storage Set (12-piece)',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
      description: 'Eco-friendly glass containers with bamboo lids',
      badge: 'Popular',
      category: 'containers',
      rating: 4.9
    },
    {
      id: 8,
      name: 'Knoshr Apron - Chef Edition',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      description: 'Professional quality apron with adjustable straps',
      badge: null,
      category: 'apparel',
      rating: 4.7
    },
    {
      id: 9,
      name: 'Meal Prep Lunch Box (3-compartment)',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
      description: 'Stackable bento-style lunch boxes for organized meals',
      badge: 'New',
      category: 'containers',
      rating: 4.8
    },
    {
      id: 10,
      name: 'Knoshr Reusable Produce Bags (Set of 8)',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
      description: 'Mesh bags for grocery shopping - reduce plastic waste',
      badge: 'Eco',
      category: 'bags',
      rating: 4.6
    },
    {
      id: 11,
      name: 'Digital Kitchen Scale',
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400',
      description: 'Precise measurements for perfect portions every time',
      badge: null,
      category: 'utensils',
      rating: 4.8
    },
    {
      id: 12,
      name: 'Knoshr Hoodie - Premium Edition',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      description: 'Cozy premium hoodie with embroidered Knoshr logo',
      badge: 'Premium',
      category: 'apparel',
      rating: 4.9
    }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const getItemQuantity = (productId: number) => {
    const item = items.find(i => i.id === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 flex justify-between items-center bg-white border-b sticky top-0 z-20">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg flex flex-col">
            <SheetHeader>
              <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
            </SheetHeader>
            
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-orange-500 font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 ml-auto text-red-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <SheetFooter className="border-t pt-4">
                  <div className="w-full space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Subtotal:</span>
                      <span className="text-orange-500">${totalPrice.toFixed(2)}</span>
                    </div>
                    {totalPrice >= 50 && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Check className="h-4 w-4" />
                        Free shipping on orders over $50!
                      </div>
                    )}
                    {totalPrice < 50 && (
                      <p className="text-sm text-gray-500">
                        Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                      </p>
                    )}
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knoshr Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Get everything you need to participate in meal prep tables and build your community. 
            All products are carefully selected and branded with the Knoshr mission in mind.
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Free shipping over $50
            </div>
            <div className="flex items-center gap-2">
              <Recycle className="h-4 w-4" />
              Eco-friendly packaging
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Community approved
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="containers">Containers</SelectItem>
                <SelectItem value="bags">Bags</SelectItem>
                <SelectItem value="utensils">Utensils</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            return (
              <Card key={product.id} className="hover:shadow-lg transition-shadow flex flex-col group">
                <CardHeader className="pb-4">
                  <div className="relative overflow-hidden rounded-md">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className={`absolute top-2 right-2 ${
                        product.badge === 'New' ? 'bg-blue-500' :
                        product.badge === 'Premium' ? 'bg-purple-500' :
                        product.badge === 'Eco' ? 'bg-green-500' :
                        'bg-orange-500'
                      }`}>
                        {product.badge}
                      </Badge>
                    )}
                    {quantity > 0 && (
                      <Badge className="absolute top-2 left-2 bg-gray-900">
                        {quantity} in cart
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}

        <div className="mt-12 bg-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-orange-800 mb-4">Why Shop with Knoshr?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">Quality Guaranteed</h3>
              <p className="text-orange-700 text-sm">Every product is tested by our community members</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">Sustainable Choice</h3>
              <p className="text-orange-700 text-sm">Eco-friendly materials and packaging</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">Support the Mission</h3>
              <p className="text-orange-700 text-sm">Proceeds help grow the Knoshr community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
