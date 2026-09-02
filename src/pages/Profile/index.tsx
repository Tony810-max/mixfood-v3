import Header from "@/components/layout/Header";
import { useCancelReservation } from "@/hooks/api/useReservations";
import { useReservations } from "@/hooks/useReservations";
import { RESERVATION_STATUS } from "@/constants";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { UpdateProfileForm } from "./components/UpdateProfileForm";
import { useProfile } from "./hooks/useProfile";
import { ReservationCard } from "../Reservations/components/ReservationCard";

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
  const { reservations, isLoading: reservationsLoading } = useReservations();
  const cancelReservation = useCancelReservation();

  const statusLabel = (status: string) => ({
    [RESERVATION_STATUS.PENDING]: t.reservationsStatusPending,
    [RESERVATION_STATUS.CONFIRMED]: t.reservationsStatusConfirmed,
    [RESERVATION_STATUS.CANCELLED]: t.reservationsStatusCancelled,
  }[status] ?? status);

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
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                  aria-label={t.reservationsTitle}
                >
                  <div className="rounded-2xl border border-orange-200 bg-white/80 p-5 shadow-xl backdrop-blur-sm dark:border-orange-900/50 dark:bg-slate-800/80">
                    <h2 className="text-xl font-semibold text-foreground">{t.reservationsTitle}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t.reservationsSubtitle}</p>
                  </div>
                  {reservationsLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="h-7 w-7 animate-spin text-orange-500" /></div>
                  ) : reservations.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 p-10 text-center text-sm text-muted-foreground dark:border-orange-900/50">
                      {t.reservationsEmpty || "You have no reservations yet."}
                    </div>
                  ) : (
                    reservations.map((reservation, index) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        index={index}
                        getStatusLabel={statusLabel}
                        onCancel={(id) => cancelReservation.mutate(id)}
                        isCancelling={cancelReservation.isPending}
                        labels={{
                          date: t.reservationsDate || "Date",
                          time: t.reservationsTime || "Time",
                          guests: t.reservationsGuests || "Guests",
                          guest: t.reservationsGuest || "guest",
                          phone: t.phoneNumber || "Phone",
                          note: t.reservationsNote || "Note",
                          cancel: t.reservationCancel || "Cancel",
                          cancelDialogTitle: t.reservationCancelDialogTitle || "Cancel Reservation",
                          cancelDialogDescription: t.reservationCancelDialogDescription || 'Are you sure you want to cancel the reservation for "{name}"?',
                          cancelDialogCancel: t.reservationCancelDialogKeep || "Keep",
                          cancelDialogConfirm: t.reservationCancelDialogConfirm || "Yes, cancel",
                          cancelDialogConfirming: t.reservationCancelDialogConfirming || "Cancelling...",
                          cancelledBy: t.reservationsCancelledBy || "Cancelled by",
                          cancelledByUser: t.reservationsCancelledByUser || "You",
                          cancelledByAdmin: t.reservationsCancelledByAdmin || "Restaurant",
                          cancellationReason: t.reservationsCancellationReason || "Reason",
                        }}
                      />
                    ))
                  )}
                </motion.section>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
