import { ProtectedRoute } from "@/components/auth";
import { BlockedUserToast } from "@/components/common/BlockedUserToast";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import RouteProgress from "@/components/common/RouteProgress";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TableSessionProvider } from "@/contexts/TableSessionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./pages/Auth/ForgotPassword/index.tsx";
import LoginPage from "./pages/Auth/Login/index.tsx";
import RegisterPage from "./pages/Auth/Register/index.tsx";
import Booking from "./pages/Booking/index.tsx";
import BookingSuccess from "./pages/BookingSuccess/index.tsx";
import Index from "./pages/Index.tsx";
import MenuPage from "./pages/Menu/index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProfilePage from "./pages/Profile/index.tsx";
import ReservationsPage from "./pages/Reservations/index.tsx";
import TableOrderPage from "./pages/TableOrder/index.tsx";
import TableOrderLayout from "./pages/TableOrder/Layout.tsx";
import TableMenuPage from "./pages/TableOrder/MenuPage.tsx";
import TableOrdersPage from "./pages/TableOrder/OrdersPage.tsx";
import TableChatPage from "./pages/TableOrder/ChatPage.tsx";
import TableBillPage from "./pages/TableOrder/BillPage.tsx";
import { ROUTES } from "./utils/const.ts";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TableSessionProvider>
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster  />
              <Sonner />
              <BlockedUserToast />
              <BrowserRouter>
                <RouteProgress />
                <Routes>
                  {/* QR Table Ordering — no auth required */}
                  <Route path="/q/:token" element={<TableOrderPage />}>
                    <Route index element={<Navigate to="menu" replace />} />
                    <Route element={<TableOrderLayout />}>
                      <Route path="menu" element={<TableMenuPage />} />
                      <Route path="orders" element={<TableOrdersPage />} />
                      <Route path="chat" element={<TableChatPage />} />
                      <Route path="bill" element={<TableBillPage />} />
                    </Route>
                  </Route>
                  <Route path={ROUTES.HOME} element={<Index />} />
                  <Route path={ROUTES.MENU} element={<MenuPage />} />
                  <Route path={ROUTES.BOOKING} element={<Booking />} />
                  <Route path={ROUTES.BOOKING_SUCCESS} element={<BookingSuccess />} />
                <Route path={ROUTES.PROFILE} element={
                  <ProtectedRoute requireAuth={true}>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path={ROUTES.RESERVATIONS} element={
                  <ProtectedRoute requireAuth={true}>
                    <ReservationsPage />
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
                  <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </TableSessionProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
