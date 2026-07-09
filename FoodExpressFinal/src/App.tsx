import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import FoodDetailsPage from "./pages/FoodDetailsPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { AuthProvider } from "./store/AuthContext";
import { CartProvider } from "./store/CartContext";
import { LocationProvider } from "./store/LocationContext";
import { SearchProvider } from "./store/SearchContext";
import { ToastProvider } from "./store/ToastContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LocationProvider>
          <SearchProvider>
            <ToastProvider>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
                  <Route path="/food/:id" element={<FoodDetailsPage />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </ToastProvider>
          </SearchProvider>
        </LocationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
