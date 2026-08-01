import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getApiErrorMessage } from "@/services/api";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { Lock, Mail, Save, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Update Info Form State
  const [updateInfoForm, setUpdateInfoForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
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
      // TODO: Call API to update user info
      toast.success(t.profileUpdateSuccess);
    } catch (error) {
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
      // TODO: Call API to change password
      toast.success(t.profilePasswordChanged);
      setChangePasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
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
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-2 shadow-2xl border-4 border-white dark:border-orange-800 flex items-center justify-center">
                  <User className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-1">Mix Food</h2>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {t.profileTitle}
                </CardTitle>
                
              </motion.div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-1">
                  <TabsTrigger 
                    value="info" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all"
                  >
                    {t.profileUpdateInfo}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="password" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all"
                  >
                    {t.profileChangePassword}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-6">
                  <form onSubmit={handleUpdateInfo} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        {t.registerFullName}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder={t.registerFullNamePlaceholder}
                          className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                          value={updateInfoForm.name}
                          onChange={(e) => setUpdateInfoForm({ ...updateInfoForm, name: e.target.value })}
                        />
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
                          className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                          value={updateInfoForm.email}
                          onChange={(e) => setUpdateInfoForm({ ...updateInfoForm, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        {t.registerPhoneNumber}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t.registerPhonePlaceholder}
                          className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                          value={updateInfoForm.phone}
                          onChange={(e) => setUpdateInfoForm({ ...updateInfoForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    {updateInfoErrors.general && (
                      <p className="text-sm text-red-500">{updateInfoErrors.general}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                      size="lg"
                      disabled={isLoading}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? t.profileUpdating : t.profileUpdateButton}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="password" className="space-y-4 mt-6">
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm font-medium">
                        {t.profileCurrentPassword}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder={t.profileCurrentPasswordPlaceholder}
                          className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                          value={changePasswordForm.currentPassword}
                          onChange={(e) => setChangePasswordForm({ ...changePasswordForm, currentPassword: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-medium">
                        {t.profileNewPassword}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder={t.registerPasswordPlaceholder}
                          className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                          value={changePasswordForm.newPassword}
                          onChange={(e) => setChangePasswordForm({ ...changePasswordForm, newPassword: e.target.value })}
                        />
                      </div>
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
                          className="pl-10 h-11 border-orange-200 dark:border-orange-900 focus:border-orange-400 focus:ring-orange-400"
                          value={changePasswordForm.confirmPassword}
                          onChange={(e) => setChangePasswordForm({ ...changePasswordForm, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                    {changePasswordErrors.general && (
                      <p className="text-sm text-red-500">{changePasswordErrors.general}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                      size="lg"
                      disabled={isLoading}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? t.profileUpdating : t.profileChangePasswordButton}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button
                variant="outline"
                className="w-full h-11 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                size="lg"
                onClick={handleLogout}
              >
                {t.headerLogout}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
