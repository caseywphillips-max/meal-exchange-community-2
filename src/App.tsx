import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Communities from "./pages/Communities";
import Recipes from "./pages/Recipes";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import JoinTable from "./pages/JoinTable";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import SearchResults from "./pages/SearchResults";
import TableReviews from "./pages/TableReviews";
import NotificationSettings from "./pages/NotificationSettings";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import OAuthCallback from "./components/OAuthCallback";

const queryClient = new QueryClient();

const ProfileRoute = () => {
  const navigate = useNavigate();

  return (
    <Profile
      onNavigate={(page) => navigate(page === 'dashboard' ? '/' : `/${page}`)}
    />
  );
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/auth/callback" element={<OAuthCallback />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfileRoute />
                    </ProtectedRoute>
                  } />
                  <Route path="/join-table" element={
                    <ProtectedRoute>
                      <JoinTable />
                    </ProtectedRoute>
                  } />
                  <Route path="/join-table/:tableId" element={
                    <ProtectedRoute>
                      <JoinTable />
                    </ProtectedRoute>
                  } />
                  <Route path="/table/:tableId/reviews" element={<TableReviews />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/notifications" element={
                    <ProtectedRoute>
                      <NotificationSettings />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </NotificationProvider>
            </AuthProvider>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
