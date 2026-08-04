import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RESERVATION_STATUS, STATUS_COLORS } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDateFormat } from "@/hooks/useDateFormat";
import { useReservations } from "@/hooks/useReservations";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle, ChevronDown, Clock, Loader2, MoreVertical, Phone, RefreshCw, Search, Users, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReservationsPage = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { formatDate } = useDateFormat();
  const { reservations, isLoading, stats, refreshReservations, filterReservations, sortReservations } = useReservations();
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Filter and sort reservations
  const filteredAndSortedReservations = sortReservations(
    filterReservations(activeTab === "all" ? undefined : activeTab, searchQuery),
    sortBy as 'date-desc' | 'date-asc' | 'status'
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      [RESERVATION_STATUS.PENDING]: {
        icon: AlertCircle,
        label: t.reservationsStatusPending,
        colors: STATUS_COLORS.PENDING,
      },
      [RESERVATION_STATUS.CONFIRMED]: {
        icon: CheckCircle,
        label: t.reservationsStatusConfirmed,
        colors: STATUS_COLORS.CONFIRMED,
      },
      [RESERVATION_STATUS.CANCELLED]: {
        icon: XCircle,
        label: t.reservationsStatusCancelled,
        colors: STATUS_COLORS.CANCELLED,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const Icon = config.icon;
    return (
      <div className={`flex items-center gap-2 px-3 py-1 ${config.colors.bg} ${config.colors.text} rounded-full text-sm font-medium`}>
        <Icon className="h-4 w-4" />
        {config.label}
      </div>
    );
  };

  const StatCard = ({ icon: Icon, label, value, color, bgColor }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
    color: string;
    bgColor: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-6"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Header />
        <div className="min-h-[calc(100vh-72px)] pt-[72px] flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="mb-6">
                <AlertCircle className="h-16 w-16 text-orange-500 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {t.reservationsLoginRequired}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t.reservationsLoginMessage}
              </p>
              <Button
                onClick={() => window.location.href = ROUTES.AUTH.LOGIN}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg"
                size="lg"
              >
                {t.reservationsLoginButton}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="min-h-[calc(100vh-72px)] pt-[72px]">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-500/5 dark:via-amber-500/5 dark:to-orange-500/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                {t.reservationsTitle}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.reservationsSubtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Statistics Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard
                  icon={Calendar}
                  label={t.reservationsTotal || "Tổng"}
                  value={stats.total}
                  color="text-orange-600 dark:text-orange-400"
                  bgColor="bg-orange-100 dark:bg-orange-900/30"
                />
                <StatCard
                  icon={AlertCircle}
                  label={t.reservationsStatusPending || "Chờ xác nhận"}
                  value={stats.pending}
                  color="text-yellow-600 dark:text-yellow-400"
                  bgColor="bg-yellow-100 dark:bg-yellow-900/30"
                />
                <StatCard
                  icon={CheckCircle}
                  label={t.reservationsStatusConfirmed || "Đã xác nhận"}
                  value={stats.confirmed}
                  color="text-green-600 dark:text-green-400"
                  bgColor="bg-green-100 dark:bg-green-900/30"
                />
                <StatCard
                  icon={XCircle}
                  label={t.reservationsStatusCancelled || "Đã hủy"}
                  value={stats.cancelled}
                  color="text-red-600 dark:text-red-400"
                  bgColor="bg-red-100 dark:bg-red-900/30"
                />
              </div>

              {/* Search and Filter Bar */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.reservationsSearch || "Tìm kiếm..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1 md:flex-none">
                          <ChevronDown className="h-4 w-4 mr-2" />
                          {sortBy === "date-desc" ? (t.reservationsSortNewest || "Mới nhất") : 
                           sortBy === "date-asc" ? (t.reservationsSortOldest || "Cũ nhất") :
                           (t.reservationsSortStatus || "Theo trạng thái")}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortBy("date-desc")}>
                          {t.reservationsSortNewest || "Mới nhất"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("date-asc")}>
                          {t.reservationsSortOldest || "Cũ nhất"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("status")}>
                          {t.reservationsSortStatus || "Theo trạng thái"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => refreshReservations()}
                      title={t.reservationsRefresh || "Làm mới"}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-900/50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    {t.reservationsTabAll || "Tất cả"} ({stats.total})
                  </TabsTrigger>
                  <TabsTrigger value={RESERVATION_STATUS.PENDING} className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    {t.reservationsStatusPending || "Chờ xác nhận"} ({stats.pending})
                  </TabsTrigger>
                  <TabsTrigger value={RESERVATION_STATUS.CONFIRMED} className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                    {t.reservationsStatusConfirmed || "Đã xác nhận"} ({stats.confirmed})
                  </TabsTrigger>
                  <TabsTrigger value={RESERVATION_STATUS.CANCELLED} className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                    {t.reservationsStatusCancelled || "Đã hủy"} ({stats.cancelled})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  {filteredAndSortedReservations.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12"
                    >
                      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-12">
                        <Calendar className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {activeTab === "all" ? t.reservationsEmpty : (t.reservationsEmptyFiltered || "Không có đặt bàn nào")}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {activeTab === "all" ? t.reservationsEmptyMessage : (t.reservationsEmptyFilteredMessage || "Không tìm thấy đặt bàn nào phù hợp với bộ lọc")}
                        </p>
                        {activeTab === "all" && (
                          <Button
                            onClick={() => window.location.href = ROUTES.BOOKING}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg"
                          >
                            {t.reservationsBookButton}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredAndSortedReservations.map((reservation, index) => (
                        <motion.div
                          key={reservation.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 overflow-hidden hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 transition-all duration-300"
                        >
                          <div className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                              {/* Status Badge - Mobile Top, Desktop Right */}
                              <div className="lg:hidden flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors">
                                    {reservation.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                                    {reservation.phone}
                                  </p>
                                </div>
                                {getStatusBadge(reservation.status)}
                              </div>

                              {/* Main Content */}
                              <div className="flex-1">
                                <div className="hidden lg:flex items-start justify-between mb-4">
                                  <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-white transition-colors">
                                      {reservation.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                                      {reservation.phone}
                                    </p>
                                  </div>
                                  {getStatusBadge(reservation.status)}
                                </div>
                                
                                {/* Reservation Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg group-hover:bg-white/20 group-hover:dark:bg-white/10 transition-colors">
                                    <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0 group-hover:text-white transition-colors" />
                                    <div>
                                      <p className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">{t.reservationsDate || "Ngày"}</p>
                                      <p className="font-medium text-foreground group-hover:text-white transition-colors">{formatDate(reservation.reservationDate)}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg group-hover:bg-white/20 group-hover:dark:bg-white/10 transition-colors">
                                    <Clock className="h-4 w-4 text-orange-500 flex-shrink-0 group-hover:text-white transition-colors" />
                                    <div>
                                      <p className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">{t.reservationsTime || "Giờ"}</p>
                                      <p className="font-medium text-foreground group-hover:text-white transition-colors">{reservation.reservationTime}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg group-hover:bg-white/20 group-hover:dark:bg-white/10 transition-colors">
                                    <Users className="h-4 w-4 text-orange-500 flex-shrink-0 group-hover:text-white transition-colors" />
                                    <div>
                                      <p className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">{t.reservationsGuests || "Khách"}</p>
                                      <p className="font-medium text-foreground group-hover:text-white transition-colors">{reservation.numberOfGuests} {t.reservationsGuest || "khách"}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg group-hover:bg-white/20 group-hover:dark:bg-white/10 transition-colors">
                                    <Phone className="h-4 w-4 text-orange-500 flex-shrink-0 group-hover:text-white transition-colors" />
                                    <div>
                                      <p className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">{t.reservationsPhone || "Điện thoại"}</p>
                                      <p className="font-medium text-foreground group-hover:text-white transition-colors">{reservation.phone}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                {reservation.note && (
                                  <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-900/50 group-hover:bg-white/20 group-hover:dark:bg-white/10 group-hover:border-white/30 transition-colors">
                                    <p className="text-sm text-amber-700 dark:text-amber-400 group-hover:text-white transition-colors">
                                      <span className="font-medium">{t.reservationsNote || "Ghi chú"}:</span> {reservation.note}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex lg:flex-col gap-2 lg:w-auto w-full">
                                {reservation.status === RESERVATION_STATUS.PENDING && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 lg:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={() => {
                                      // TODO: Implement cancel functionality
                                      toast.info("Tính năng hủy đặt bàn đang được phát triển");
                                    }}
                                  >
                                    {t.reservationsCancel || "Hủy"}
                                  </Button>
                                )}
                                {reservation.status === RESERVATION_STATUS.CANCELLED && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 lg:flex-none"
                                    onClick={() => window.location.href = ROUTES.BOOKING}
                                  >
                                    {t.reservationsRebook || "Đặt lại"}
                                  </Button>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                                    <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {
                                      // TODO: Implement view details
                                      toast.info("Tính năng xem chi tiết đang được phát triển");
                                    }}>
                                      {t.reservationsViewDetails || "Xem chi tiết"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                      navigator.clipboard.writeText(`Đặt bàn: ${reservation.name}, ${reservation.phone}, ${formatDate(reservation.reservationDate)} ${reservation.reservationTime}, ${reservation.numberOfGuests} khách`);
                                      toast.success("Đã sao chép thông tin đặt bàn");
                                    }}>
                                      {t.reservationsCopy || "Sao chép"}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                          
                          {/* Footer */}
                          <div className="px-6 py-3 bg-orange-50/50 dark:bg-orange-900/20 border-t border-orange-200 dark:border-orange-900/50 text-xs text-muted-foreground flex justify-between items-center">
                            <span>{t.reservationsBookedAt || "Đặt lúc"} {new Date(reservation.createdAt).toLocaleString('vi-VN')}</span>
                            <span className="text-orange-600 dark:text-orange-400 font-medium">
                              #{String(reservation.id).slice(-6)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
