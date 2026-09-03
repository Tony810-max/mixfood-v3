import Header from "@/components/layout/Header";
import { useCancelReservation } from "@/hooks/api/useReservations";
import { useReservations } from "@/hooks/useReservations";
import { motion } from "framer-motion";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { UpdateProfileForm } from "./components/UpdateProfileForm";
import { useProfile } from "./hooks/useProfile";
import { ReservationHistoryTable } from "./components/ReservationHistoryTable";

const ProfilePage = () => {
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
  const { reservations, isLoading: reservationsLoading, stats, refreshReservations } = useReservations();
  const cancelReservation = useCancelReservation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="min-h-[calc(100vh-80px)] pt-[80px]">
        <ProfileHeader user={user} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Navigation */}
            <ProfileSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onLogout={handleLogout}
              labels={{
                accountSettings: t.profileAccountSettings,
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
                      title: t.profilePersonalInfoTitle,
                      fullName: t.registerFullName,
                      email: t.email,
                      phone: t.phoneNumber,
                      fullNamePlaceholder: t.fullNamePlaceholder,
                      emailPlaceholder: t.emailPlaceholder,
                      phonePlaceholder: t.phonePlaceholder,
                      emailNote: t.profileEmailNote,
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
                      title: t.profileChangePasswordTitle,
                      currentPassword: t.profileCurrentPassword,
                      newPassword: t.profileNewPassword,
                      confirmPassword: t.profileConfirmNewPassword,
                      currentPasswordPlaceholder: t.profileCurrentPasswordPlaceholder,
                      newPasswordPlaceholder: t.registerPasswordPlaceholder,
                      confirmPasswordPlaceholder: t.registerConfirmPasswordPlaceholder,
                      save: t.profileChangePasswordButton,
                      saving: t.profileUpdating,
                    }}
                  />
                </motion.div>
              )}

              {activeSection === "reservations" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <ReservationHistoryTable
                    reservations={reservations}
                    isLoading={reservationsLoading}
                    stats={stats}
                    onRefresh={refreshReservations}
                    onCancel={(id) => cancelReservation.mutate(id)}
                    isCancelling={cancelReservation.isPending}
                    labels={{ title: t.reservationsTitle, subtitle: t.reservationsSubtitle, total: t.reservationsTotal || 'Total', pending: t.reservationsStatusPending, confirmed: t.reservationsStatusConfirmed, arrived: 'Arrived', cancelled: t.reservationsStatusCancelled, search: t.reservationsSearch, all: t.reservationsTabAll, newest: t.reservationsSortNewest, oldest: t.reservationsSortOldest, byStatus: t.reservationsSortStatus, refresh: t.reservationsRefresh, refreshSuccess: t.reservationsRefreshSuccess, customer: 'Customer', date: t.reservationsDate, guests: t.reservationsGuests, status: 'Status', actions: 'Actions', cancel: t.reservationsCancel, empty: t.reservationsEmpty, cancelTitle: t.reservationCancelDialogTitle, cancelDescription: t.reservationCancelDialogDescription, keep: t.reservationCancelDialogKeep, cancelling: t.reservationCancelDialogConfirming, cancelledBy: t.reservationsCancelledBy || 'Người hủy', cancelledByUser: t.reservationsCancelledByUser || 'Bạn', cancelledByAdmin: t.reservationsCancelledByAdmin || 'Nhà hàng', reason: t.reservationsCancellationReason || 'Lý do' }}
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
