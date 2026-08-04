import { AuthCard, AuthFormLayout, AuthHeader, AuthLogo } from "@/components/auth";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
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
      <AuthCard>
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthFormLayout>
            <AuthLogo icon={<Mail className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />} />
            <AuthHeader
              title={t.forgotPasswordTitle || "Quên Mật Khẩu"}
              subtitle={t.forgotPasswordSuccessMessage || "Đã gửi email hướng dẫn đặt lại mật khẩu!"}
            />
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  {t.forgotPasswordSuccessDesc || "Chúng tôi đã gửi email đến địa chỉ"} <span className="font-semibold">{email}</span>. {t.forgotPasswordCheckEmail || "Vui lòng kiểm tra hộp thư và làm theo hướng dẫn."}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.forgotPasswordBackToLogin || "Quay lại đăng nhập"}
              </Button>
            </div>
          </AuthFormLayout>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthFormLayout>
          <AuthLogo icon={<Lock className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />} />
          <AuthHeader
            title={t.forgotPasswordTitle || "Quên Mật Khẩu"}
            subtitle={t.forgotPasswordSubtitle || "Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu"}
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
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => navigate(ROUTES.AUTH.LOGIN)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.forgotPasswordBackToLogin || "Quay lại đăng nhập"}
            </Button>
          </div>
        </AuthFormLayout>
      </motion.div>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
