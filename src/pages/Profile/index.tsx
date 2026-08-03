import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getApiErrorMessage } from "@/services/api";
import { userService } from "@/services/user.service";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { Calendar, Lock, LogOut, Mail, Save, Shield, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"info" | "password">("info");

  // Update Info Form State
  const [updateInfoForm, setUpdateInfoForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [updateInfoErrors, setUpdateInfoErrors] = useState<Record<string, string>>({});

  // Change Password Form State
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePasswordErrors, setChangePasswordErrors] = useState<Record<string, string>>({});

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateInfoErrors({});

    if (!updateInfoForm.name || !updateInfoForm.email) {
      setUpdateInfoErrors({ general: t.validationRequired });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Updating profile with data:', {
        name: updateInfoForm.name,
        email: updateInfoForm.email,
        phone: updateInfoForm.phone,
      });
      
      const response = await userService.updateProfile({
        name: updateInfoForm.name,
        email: updateInfoForm.email,
        phone: updateInfoForm.phone,
      });
      
      console.log('Update profile response:', response);
      
      // Update user context if response contains user data
      if (response.user) {
        const updatedUser = {
          ...user,
          name: response.user.name,
          email: response.user.email,
        };
        localStorage.setItem('mixfood.user', JSON.stringify(updatedUser));
        // You might need to add a method to update user in AuthContext
      }
      
      toast.success(t.profileUpdateSuccess);
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordErrors({});

    if (!changePasswordForm.currentPassword || !changePasswordForm.newPassword || !changePasswordForm.confirmPassword) {
      setChangePasswordErrors({ general: t.validationRequired });
      return;
    }

    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setChangePasswordErrors({ general: t.registerPasswordMismatch });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Changing password');
      
      await userService.changePassword({
        currentPassword: changePasswordForm.currentPassword,
        newPassword: changePasswordForm.newPassword,
      });
      
      console.log('Password changed successfully');
      
      toast.success(t.profilePasswordChanged);
      setChangePasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="min-h-[calc(100vh-72px)] pt-[72px]">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-500/5 dark:via-amber-500/5 dark:to-orange-500/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-8"
            >
              {/* Profile Avatar */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 p-1 shadow-2xl border-4 border-white dark:border-orange-900/50">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center overflow-hidden">
                    <User className="h-14 w-14 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900" />
              </motion.div>

              {/* User Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center lg:text-left flex-1"
              >
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {user?.name || "User"}
                  </h1>
                  <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                    PRO
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-4">{user?.email}</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>Member since 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-500" />
                    <span>Verified Account</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="text-center px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-200 dark:border-orange-900/50">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
                  <div className="text-xs text-muted-foreground">Orders</div>
                </div>
                <div className="text-center px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-200 dark:border-orange-900/50">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full xl:w-72"
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-500" />
                  Account Settings
                </h3>
                <nav className="space-y-2">
                  <Button
                    variant={activeSection === "info" ? "default" : "ghost"}
                    className={`w-full justify-start h-12 transition-all duration-300 ${
                      activeSection === "info"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                        : "hover:bg-orange-100 dark:hover:bg-orange-900/30 text-foreground"
                    }`}
                    onClick={() => setActiveSection("info")}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span className="font-medium">{t.profileUpdateInfo}</span>
                  </Button>
                  <Button
                    variant={activeSection === "password" ? "default" : "ghost"}
                    className={`w-full justify-start h-12 transition-all duration-300 ${
                      activeSection === "password"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                        : "hover:bg-orange-100 dark:hover:bg-orange-900/30 text-foreground"
                    }`}
                    onClick={() => setActiveSection("password")}
                  >
                    <Lock className="mr-3 h-5 w-5" />
                    <span className="font-medium">{t.profileChangePassword}</span>
                  </Button>
                  <div className="border-t border-orange-200 dark:border-orange-900/50 my-4" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 hover:text-red-700 dark:text-red-400 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">{t.headerLogout}</span>
                  </Button>
                </nav>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1"
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-8">
                {activeSection === "info" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{t.profileUpdateInfo}</h3>
                        <p className="text-muted-foreground">Update your personal information and contact details</p>
                      </div>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <User className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                    
                    <form onSubmit={handleUpdateInfo} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                            {t.registerFullName}
                          </Label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="name"
                              type="text"
                              placeholder={t.registerFullNamePlaceholder}
                              className="pl-12 h-12 border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                              value={updateInfoForm.name}
                              onChange={(e) => setUpdateInfoForm({ ...updateInfoForm, name: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                            {t.registerEmail}
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="email"
                              type="email"
                              placeholder={t.registerEmailPlaceholder}
                              className="pl-12 h-12 border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                              value={updateInfoForm.email}
                              onChange={(e) => setUpdateInfoForm({ ...updateInfoForm, email: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                          {t.registerPhoneNumber}
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder={t.registerPhonePlaceholder}
                            className="pl-12 h-12 border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                            value={updateInfoForm.phone}
                            onChange={(e) => setUpdateInfoForm({ ...updateInfoForm, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      {updateInfoErrors.general && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl"
                        >
                          <p className="text-sm text-red-600 dark:text-red-400">{updateInfoErrors.general}</p>
                        </motion.div>
                      )}
                      
                      <div className="flex items-center justify-end pt-4">
                        <Button
                          type="submit"
                          className="px-8 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 rounded-xl"
                          size="lg"
                          disabled={isLoading}
                        >
                          <Save className="mr-2 h-5 w-5" />
                          {isLoading ? t.profileUpdating : t.profileUpdateButton}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {activeSection === "password" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{t.profileChangePassword}</h3>
                        <p className="text-muted-foreground">Update your password to keep your account secure</p>
                      </div>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                    
                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="currentPassword" className="text-sm font-semibold text-foreground">
                          {t.profileCurrentPassword}
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            id="currentPassword"
                            type="password"
                            placeholder={t.profileCurrentPasswordPlaceholder}
                            className="pl-12 h-12 border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                            value={changePasswordForm.currentPassword}
                            onChange={(e) => setChangePasswordForm({ ...changePasswordForm, currentPassword: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="newPassword" className="text-sm font-semibold text-foreground">
                            {t.profileNewPassword}
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="newPassword"
                              type="password"
                              placeholder={t.registerPasswordPlaceholder}
                              className="pl-12 h-12 border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                              value={changePasswordForm.newPassword}
                              onChange={(e) => setChangePasswordForm({ ...changePasswordForm, newPassword: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                            {t.registerConfirmPassword}
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder={t.registerConfirmPasswordPlaceholder}
                              className="pl-12 h-12 border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                              value={changePasswordForm.confirmPassword}
                              onChange={(e) => setChangePasswordForm({ ...changePasswordForm, confirmPassword: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      {changePasswordErrors.general && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl"
                        >
                          <p className="text-sm text-red-600 dark:text-red-400">{changePasswordErrors.general}</p>
                        </motion.div>
                      )}
                      
                      <div className="flex items-center justify-end pt-4">
                        <Button
                          type="submit"
                          className="px-8 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 rounded-xl"
                          size="lg"
                          disabled={isLoading}
                        >
                          <Save className="mr-2 h-5 w-5" />
                          {isLoading ? t.profileUpdating : t.profileChangePasswordButton}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
