import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLogout } from '@/hooks/api/useAuth';
import { useChangePassword, useUpdateProfile } from '@/hooks/api/useUser';
import { changePasswordSchema, type ChangePasswordFormData } from '@/lib/validation';
import { authStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';

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

  // Auth is restored asynchronously on a hard reload. Populate the form when
  // that user arrives instead of keeping the empty first-render values.
  useEffect(() => {
    if (!user) return;
    setUpdateInfoForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user]);

  // Change Password Form State
  const [changePasswordForm, setChangePasswordForm] = useState<ChangePasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePasswordErrors, setChangePasswordErrors] = useState<Partial<Record<keyof ChangePasswordFormData, string>>>({});

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateInfoErrors({});

    if (!updateInfoForm.name) {
      setUpdateInfoErrors({ general: t.validationRequired });
      return;
    }

    setIsLoading(true);
    try {
      // Email is immutable: only name & phone can be updated
      const response = await updateProfileMutation.mutateAsync({
        name: updateInfoForm.name,
        phone: updateInfoForm.phone,
      });
      
      if (response.user) {
        const updatedUser = {
          ...user,
          name: response.user.name,
          phone: response.user.phone,
        };
        setUser(updatedUser);
        const location: 'local' | 'session' = localStorage.getItem('mixfood.access-token') ? 'local' : 'session';
        authStorage.setUser(updatedUser, location);
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

    // Validate form using zod
    const result = changePasswordSchema.safeParse(changePasswordForm);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ChangePasswordFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ChangePasswordFormData;
        fieldErrors[field] = error.message;
      });
      setChangePasswordErrors(fieldErrors);
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
