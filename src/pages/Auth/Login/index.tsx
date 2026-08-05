
import { AuthCard, AuthFormLayout, AuthHeader, AuthLogo } from "@/components/auth";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STORAGE_KEYS } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLogin } from "@/hooks/api/useAuth";
import { loginSchema, type LoginFormData } from "@/lib/validation";
import { ROUTES } from "@/utils/const";
import { authStorage } from "@/utils/storage";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleLogin = async () => {
    // Validate form using zod
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof LoginFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginMutation.mutateAsync({ payload: { email: formData.email, password: formData.password }, remember: rememberMe });
      
      // Set user data from response
      const userData = response.user || {
        id: 1,
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'USER',
      };
      console.log('[Login] Setting user:', userData);
      console.log('[Login] Response tokens:', { 
        accessToken: response.accessToken ? 'exists' : 'missing',
        refreshToken: response.refreshToken ? 'exists' : 'missing',
      });
      setUser(userData);
      
      // Save user data to storage (same location as tokens)
      const location: 'local' | 'session' = rememberMe ? 'local' : 'session';
      console.log('[Login] Saving user to storage, location:', location);
      authStorage.setUser(userData, location);
      console.log('[Login] User saved, checking storage:', authStorage.getUser());
      
      // Verify tokens are stored
      console.log('[Login] Checking stored tokens:', {
        accessToken_local: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ? 'exists' : 'missing',
        accessToken_session: sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ? 'exists' : 'missing',
        refreshToken_local: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ? 'exists' : 'missing',
        refreshToken_session: sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ? 'exists' : 'missing',
      });
      
      navigate(ROUTES.HOME);
    } catch (error) {
      // Error is handled by the mutation
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthFormLayout>
          <AuthLogo />
          <AuthHeader
            title={t.loginTitle}
            subtitle={t.loginSubtitle}
          />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t.loginEmailAddress}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.loginEmailPlaceholderAddress}
                  className={`pl-10 h-11 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {t.loginPassword}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t.loginPasswordPlaceholder}
                  className={`pl-10 h-11 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {t.rememberMe}
                </label>
              </div>
              <Link
                to={ROUTES.AUTH.FORGOT_PASSWORD}
                className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                {t.forgotPassword}
              </Link>
            </div>
            <Button
              className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              size="lg"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? t.loginSigningIn : t.loginButton}
            </Button>
          </div>
          <div className="flex flex-col space-y-4 pt-6">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.noAccount} </span>
              <Link
                to={ROUTES.AUTH.REGISTER}
                className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                {t.registerLink}
              </Link>
            </div>
          </div>
        </AuthFormLayout>
      </motion.div>
    </AuthCard>
  );
};

export default LoginPage;