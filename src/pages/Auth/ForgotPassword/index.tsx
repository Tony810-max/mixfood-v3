import { AuthCard, AuthFormLayout, AuthHeader, AuthLogo, CountdownTimer, FORGOT_PASSWORD_STEPS, OTPInput, StepProgress } from "@/components/auth";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { ROUTES } from "@/utils/const";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Key, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    isLoading,
    error,
    setEmail,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    handleSendOTP,
    handleVerifyOTP,
    handleResetPassword,
    handleResendOTP,
    reset,
  } = useForgotPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getStepNumber = () => {
    switch (step) {
      case 'email': return 1;
      case 'otp': return 2;
      case 'newPassword': return 3;
      case 'success': return 3;
      default: return 1;
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      reset();
    } else if (step === 'newPassword') {
      setStep('email');
      setOtp('');
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  const renderEmailStep = () => (
    <motion.div
      key="email"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <AuthLogo icon={<Mail className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />} />
      <AuthHeader
        title={t.forgotPasswordTitle || "Quên Mật Khẩu"}
        subtitle={t.forgotPasswordSubtitle || "Nhập email của bạn để nhận mã OTP đặt lại mật khẩu"}
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            {t.loginEmailAddress || "Email"}
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder={t.loginEmailPlaceholderAddress || "email@example.com"}
              className={`pl-10 h-11 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button
          className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          size="lg"
          onClick={handleSendOTP}
          disabled={isLoading || !email}
        >
          {isLoading ? (
            <>
              <Key className="mr-2 h-4 w-4 animate-spin" />
              {t.forgotPasswordSending || "Đang gửi..."}
            </>
          ) : (
            <>
              <Key className="mr-2 h-4 w-4" />
              {t.forgotPasswordButton || "Gửi mã OTP"}
            </>
          )}
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
    </motion.div>
  );

  const renderOTPStep = () => (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <AuthLogo icon={<ShieldCheck className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />} />
      <AuthHeader
        title="Xác thực OTP"
        subtitle={`Nhập mã OTP đã gửi đến ${email}`}
      />
      <div className="space-y-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-800 dark:text-orange-200">
            Mã OTP gồm 6 số đã được gửi đến email của bạn. Mã có hiệu lực trong 5 phút.
          </p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Mã OTP</Label>
          <OTPInput
            length={6}
            value={otp}
            onChange={setOtp}
            disabled={isLoading}
            error={error}
          />
        </div>
        <CountdownTimer
          initialSeconds={60}
          onResend={handleResendOTP}
          isResending={isLoading}
        />
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button
            className="flex-1 h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? (
              <>
                <Key className="mr-2 h-4 w-4 animate-spin" />
                Đang xác thực...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Xác nhận
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderNewPasswordStep = () => (
    <motion.div
      key="newPassword"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <AuthLogo icon={<Lock className="w-full h-full text-orange-600 dark:text-orange-400 p-4" />} />
      <AuthHeader
        title="Đặt lại mật khẩu"
        subtitle="Nhập mật khẩu mới của bạn"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-medium">
            Mật khẩu mới
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`pl-10 pr-10 h-11 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Xác nhận mật khẩu
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`pl-10 pr-10 h-11 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400'}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button
            className="flex-1 h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={handleResetPassword}
            disabled={isLoading || !newPassword || !confirmPassword}
          >
            {isLoading ? (
              <>
                <Key className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Đặt lại mật khẩu
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
      </motion.div>
      <AuthHeader
        title="Mật khẩu đã đặt lại!"
        subtitle="Bạn có thể đăng nhập bằng mật khẩu mới"
      />
      <div className="space-y-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">
            Mật khẩu của bạn đã được thay đổi thành công. Vui lòng đăng nhập lại để tiếp tục.
          </p>
        </div>
        <Button
          className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          size="lg"
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Đăng nhập ngay
        </Button>
      </div>
    </motion.div>
  );

  return (
    <AuthCard>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthFormLayout>
          {step !== 'success' && (
            <StepProgress currentStep={getStepNumber()} steps={FORGOT_PASSWORD_STEPS} />
          )}
          <AnimatePresence mode="wait">
            {step === 'email' && renderEmailStep()}
            {step === 'otp' && renderOTPStep()}
            {step === 'newPassword' && renderNewPasswordStep()}
            {step === 'success' && renderSuccessStep()}
          </AnimatePresence>
        </AuthFormLayout>
      </motion.div>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
