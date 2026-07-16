import RouteProgress from "@/components/RouteProgress";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/Login/index.tsx";
import RegisterPage from "./pages/Auth/Register/index.tsx";
import Index from "./pages/Index.tsx";
import MenuPage from "./pages/Menu/index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Reserve from "./pages/Reserve.tsx";
import { ROUTES } from "./utils/const.ts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteProgress />
        <Routes>
          <Route path={ROUTES.HOME} element={<Index />} />
          <Route path={ROUTES.MENU} element={<MenuPage />} />
          <Route path={ROUTES.RESERVE} element={<Reserve />} />
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
