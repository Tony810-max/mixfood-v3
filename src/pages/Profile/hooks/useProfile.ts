import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLogout } from '@/hooks/api/useAuth';
import { useChangePassword, useUpdateProfile } from '@/hooks/api/useUser';
import { useState } from 'react';

export const useProfile = () => {
  const { t } = useLanguage();
  const { user, setUser } = useAuth();
  const logoutMutation = useLogout();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
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
      const response = await updateProfileMutation.mutateAsync({
        name: updateInfoForm.name,
        email: updateInfoForm.email,
        phone: updateInfoForm.phone,
      });
      
      if (response.user) {
        const updatedUser = {
          ...user,
          name: response.user.name,
          email: response.user.email,
        };
        setUser(updatedUser);
      }
    } catch (error) {
      // Error is handled by the mutation
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
      await changePasswordMutation.mutateAsync({
        currentPassword: changePasswordForm.currentPassword,
        newPassword: changePasswordForm.newPassword,
      });
      
      setChangePasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Error is handled by the mutation
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    logoutMutation.mutate();
  };

  return {
    t,
    user,
    isLoading,
    activeSection,
    setActiveSection,
    updateInfoForm,
    setUpdateInfoForm,
    updateInfoErrors,
    handleUpdateInfo,
    changePasswordForm,
    setChangePasswordForm,
    changePasswordErrors,
    handleChangePassword,
    handleLogout,
  };
};
