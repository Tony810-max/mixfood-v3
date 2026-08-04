import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement forgot password API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20 p-4">
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
                    <Mail className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-1">Mix Food</h2>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {t.forgotPasswordTitle || "Quên Mật Khẩu"}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {t.forgotPasswordSuccessMessage || "Đã gửi email hướng dẫn đặt lại mật khẩu!"}
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    {t.forgotPasswordSuccessDesc || "Chúng tôi đã gửi email đến địa chỉ"} <span className="font-semibold">{email}</span>. {t.forgotPasswordCheckEmail || "Vui lòng kiểm tra hộp thư và làm theo hướng dẫn."}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  onClick={() => navigate(ROUTES.AUTH.LOGIN)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.forgotPasswordBackToLogin || "Quay lại đăng nhập"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20 p-4">
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
                  <Lock className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-1">Mix Food</h2>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {t.forgotPasswordTitle || "Quên Mật Khẩu"}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {t.forgotPasswordSubtitle || "Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu"}
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button
                className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                size="lg"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (t.forgotPasswordSending || "Đang gửi...") : (t.forgotPasswordButton || "Gửi hướng dẫn")}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.forgotPasswordBackToLogin || "Quay lại đăng nhập"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
