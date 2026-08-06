import Header from "@/components/layout/Header";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { UpdateProfileForm } from "./components/UpdateProfileForm";
import { useProfile } from "./hooks/useProfile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
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
  } = useProfile();

  const handleNavigateToReservations = () => {
    navigate(ROUTES.RESERVATIONS);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="min-h-[calc(100vh-72px)] pt-[72px]">
        <ProfileHeader user={user} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Sidebar Navigation */}
            <ProfileSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onNavigateToReservations={handleNavigateToReservations}
              onLogout={handleLogout}
              labels={{
                profileUpdateInfo: t.profileUpdateInfo,
                profileChangePassword: t.profileChangePassword,
                reservationsTitle: t.reservationsTitle,
                headerLogout: t.headerLogout,
              }}
            />

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1"
            >
              {activeSection === "info" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <UpdateProfileForm
                    formData={updateInfoForm}
                    errors={updateInfoErrors}
                    isLoading={isLoading}
                    onInputChange={(field, value) => setUpdateInfoForm(prev => ({ ...prev, [field]: value }))}
                    onSubmit={handleUpdateInfo}
                    labels={{
                      fullName: t.registerFullName,
                      email: t.email,
                      phone: t.phoneNumber,
                      fullNamePlaceholder: t.fullNamePlaceholder,
                      emailPlaceholder: t.emailPlaceholder,
                      phonePlaceholder: t.phonePlaceholder,
                      save: t.profileUpdateButton,
                      saving: t.profileUpdating,
                    }}
                  />
                </motion.div>
              )}

              {activeSection === "password" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChangePasswordForm
                    formData={changePasswordForm}
                    errors={changePasswordErrors}
                    isLoading={isLoading}
                    onInputChange={(field, value) => setChangePasswordForm(prev => ({ ...prev, [field]: value }))}
                    onSubmit={handleChangePassword}
                    labels={{
                      currentPassword: t.profileCurrentPassword,
                      newPassword: t.profileNewPassword,
                      confirmPassword: t.registerConfirmPassword,
                      currentPasswordPlaceholder: t.profileCurrentPasswordPlaceholder,
                      newPasswordPlaceholder: t.registerPasswordPlaceholder,
                      confirmPasswordPlaceholder: t.registerConfirmPasswordPlaceholder,
                      save: t.profileUpdateButton,
                      saving: t.profileUpdating,
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
