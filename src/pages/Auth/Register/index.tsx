import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { registerSchema, type RegisterFormData } from "@/lib/validation";
import { getApiErrorMessage } from "@/services/api";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/utils/const";
import { formatPhoneNumber, formatVerificationCode } from "@/utils/formatters";
import { motion } from "framer-motion";
import { Lock, Mail, Phone, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    verifyCode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = async () => {
    // Validate email field only
    const emailResult = registerSchema.safeParse({ ...formData, fullName: "test", password: "Test123", confirmPassword: "Test123", verifyCode: "123456" });
    
    if (!emailResult.success) {
      const emailError = emailResult.error.errors.find(e => e.path[0] === "email");
      if (emailError) {
        setErrors(prev => ({ ...prev, email: emailError.message }));
        return;
      }
    }

    if (countdown > 0) return;

    setIsLoading(true);
    try {
      await authService.sendRegistrationCode(formData.email);
      setCountdown(60); // 60 seconds cooldown
      toast.success(t.registerCodeSent);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    // Validate form using zod
    const result = registerSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof RegisterFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await authService.register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        code: formData.verifyCode,
        password: formData.password,
      });
      toast.success(t.registerSuccess);
      // Auto-login after successful registration
      navigate(ROUTES.AUTH.LOGIN);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    // Format phone number and verification code
    let formattedValue = value;
    if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    } else if (field === 'verifyCode') {
      formattedValue = formatVerificationCode(value);
    }
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="flex items-center justify-center pt-20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-orange-200 dark:border-orange-900 shadow-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-2 shadow-2xl border-4 border-white dark:border-orange-800">
                <img 
                  src="/favicon.jpg" 
                  alt="Mix Food Logo" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-1">Mix Food</h2>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {t.registerTitle}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {t.registerSubtitle}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="md:flex justify-between  items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                {t.registerFullName}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t.registerFullNamePlaceholder}
                  className={`pl-10 h-11 ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                {t.registerPhoneNumber}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.registerPhonePlaceholder}
                  className={`pl-10 h-11 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t.registerEmail}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.registerEmailPlaceholder}
                  className={`pl-10 h-11 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {t.registerPassword}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t.registerPasswordPlaceholder}
                  className={`pl-10 h-11 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                {t.registerConfirmPassword}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t.registerConfirmPasswordPlaceholder}
                  className={`pl-10 h-11 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="verifyCode" className="text-sm font-medium">
                {t.registerVerifyCode}
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="verifyCode"
                    type="text"
                    placeholder={t.registerVerifyCodePlaceholder}
                    maxLength={6}
                    className={`pl-10 h-11 ${errors.verifyCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
                    value={formData.verifyCode}
                    onChange={(e) => handleInputChange("verifyCode", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-orange-200 dark:border-orange-900 hover:bg-orange-50 dark:hover:bg-orange-950 whitespace-nowrap"
                  onClick={handleSendCode}
                  disabled={countdown > 0 || isLoading}
                >
                  {isLoading ? t.registerSending : countdown > 0 
                    ? t.registerResendIn.replace("{seconds}", countdown.toString())
                    : formData.verifyCode ? t.registerResendCode : t.registerSendCode}
                </Button>
              </div>
              {errors.verifyCode && <p className="text-sm text-red-500">{errors.verifyCode}</p>}
            </div>
            <Button
              className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              size="lg"
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? t.registerCreating : t.registerButton}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 w">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.registerHasAccount} </span>
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                {t.registerLoginLink}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;