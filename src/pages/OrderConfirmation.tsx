import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Mail, 
  ArrowRight,
  Printer,
  Home,
  ShoppingBag,
  Calendar,
  MapPin
} from 'lucide-react';

interface OrderDetails {
  orderId: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
  shippingMethod: string;
  createdAt: string;
}

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Try to get order from localStorage (demo mode)
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, [sessionId]);

  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDays = order?.shippingMethod === 'express' ? 2 : 5;
    const maxDays = order?.shippingMethod === 'express' ? 3 : 7;
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Order Found</h2>
            <p className="text-gray-500 mb-6">
              We couldn't find your order details. Please check your email for confirmation.
            </p>
            <Link to="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order. We've sent a confirmation email to{' '}
            <span className="font-medium">{order.shippingAddress.email}</span>
          </p>
        </div>

        {/* Order Info Banner */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <p className="text-orange-100 text-sm mb-1">Order Number</p>
                <p className="font-bold text-lg">{order.orderId}</p>
              </div>
              <div>
                <p className="text-orange-100 text-sm mb-1">Order Date</p>
                <p className="font-bold text-lg">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-orange-100 text-sm mb-1">Estimated Delivery</p>
                <p className="font-bold text-lg">{getEstimatedDelivery()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Order Items ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-500" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </h4>
                    <p className="text-gray-600">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                    {order.shippingAddress.apartment && (
                      <p className="text-gray-600">{order.shippingAddress.apartment}</p>
                    )}
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Delivery Method
                    </h4>
                    <Badge className={order.shippingMethod === 'express' ? 'bg-purple-500' : 'bg-blue-500'}>
                      {order.shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping'}
                    </Badge>
                    <p className="text-gray-600 mt-2">
                      {order.shippingMethod === 'express' 
                        ? 'Arrives in 2-3 business days' 
                        : 'Arrives in 5-7 business days'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  <div className="relative flex items-start gap-4 pb-6">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4 pb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                      <Package className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Processing</p>
                      <p className="text-sm text-gray-400">Preparing your order</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4 pb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                      <Truck className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Shipped</p>
                      <p className="text-sm text-gray-400">On the way to you</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                      <Home className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Delivered</p>
                      <p className="text-sm text-gray-400">Expected: {getEstimatedDelivery()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{parseFloat(order.shippingCost) === 0 ? 'FREE' : `$${order.shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-orange-500">${order.total}</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handlePrint}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Receipt
                  </Button>
                  
                  <Link to="/shop" className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>

                  <Link to="/" className="block">
                    <Button variant="ghost" className="w-full">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3 text-sm">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Need Help?</p>
                      <p className="text-gray-500">
                        Contact us at{' '}
                        <a href="mailto:support@knoshr.com" className="text-orange-500 hover:underline">
                          support@knoshr.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Next Section */}
        <Card className="mt-8 bg-orange-50 border-orange-200">
          <CardContent className="py-6">
            <h3 className="text-lg font-semibold text-orange-800 mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-700 font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium text-orange-800">Order Processing</p>
                  <p className="text-sm text-orange-700">We're preparing your items for shipment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-700 font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-orange-800">Shipping Notification</p>
                  <p className="text-sm text-orange-700">You'll receive tracking info via email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-700 font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium text-orange-800">Delivery</p>
                  <p className="text-sm text-orange-700">Your order arrives at your doorstep</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
