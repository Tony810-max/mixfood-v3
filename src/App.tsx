import { ProtectedRoute } from "@/components/ProtectedRoute";
import RouteProgress from "@/components/RouteProgress";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/Login/index.tsx";
import RegisterPage from "./pages/Auth/Register/index.tsx";
import Booking from "./pages/Booking/index.tsx";
import BookingSuccess from "./pages/BookingSuccess/index.tsx";
import Index from "./pages/Index.tsx";
import MenuPage from "./pages/Menu/index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProfilePage from "./pages/Profile/index.tsx";
import Reserve from "./pages/Reserve.tsx";
import { ROUTES } from "./utils/const.ts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteProgress />
            <Routes>
              <Route path={ROUTES.HOME} element={<Index />} />
              <Route path={ROUTES.MENU} element={<MenuPage />} />
              <Route path={ROUTES.RESERVE} element={<Reserve />} />
              <Route path={ROUTES.BOOKING} element={<Booking />} />
              <Route path={ROUTES.BOOKING_SUCCESS} element={<BookingSuccess />} />
              <Route path={ROUTES.PROFILE} element={
                <ProtectedRoute requireAuth={true}>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.AUTH.LOGIN} element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.AUTH.REGISTER} element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterPage />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
