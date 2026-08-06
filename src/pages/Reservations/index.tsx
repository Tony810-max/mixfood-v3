import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RESERVATION_STATUS } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReservations } from "@/hooks/useReservations";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, ChevronDown, Loader2, RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReservationCard } from "./components/ReservationCard";
import { ReservationsStats } from "./components/ReservationsStats";

const ReservationsPage = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { reservations, isLoading, stats, refreshReservations, filterReservations, sortReservations } = useReservations();
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleRefresh = () => {
    setIsRefreshDisabled(true);
    setHasAnimated(false);
    refreshReservations();
    toast.success("Đã làm mới danh sách đặt bàn", {
      duration: 2000,
    });
    
    setTimeout(() => {
      setIsRefreshDisabled(false);
    }, 5000);
  };

  // Filter and sort reservations
  const filteredAndSortedReservations = sortReservations(
    filterReservations(activeTab === "all" ? undefined : activeTab, searchQuery),
    sortBy as 'date-desc' | 'date-asc' | 'status'
  );

  useEffect(() => {
    if (!hasAnimated && !isLoading && filteredAndSortedReservations.length > 0) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [filteredAndSortedReservations.length, hasAnimated, isLoading]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      [RESERVATION_STATUS.PENDING]: t.reservationsStatusPending,
      [RESERVATION_STATUS.CONFIRMED]: t.reservationsStatusConfirmed,
      [RESERVATION_STATUS.CANCELLED]: t.reservationsStatusCancelled,
    };
    return labels[status] || status;
  };

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
              <ReservationsStats
                stats={stats}
                labels={{
                  total: t.reservationsTotal || "Tổng",
                  pending: t.reservationsStatusPending || "Chờ xác nhận",
                  confirmed: t.reservationsStatusConfirmed || "Đã xác nhận",
                  cancelled: t.reservationsStatusCancelled || "Đã hủy",
                }}
              />

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
                        <Button variant="outline" className="flex-1 md:flex-none hover:bg-primary-gradient">
                          <ChevronDown className="h-4 w-4 mr-2" />
                          {sortBy === "date-desc" ? (t.reservationsSortNewest || "Mới nhất") : 
                           sortBy === "date-asc" ? (t.reservationsSortOldest || "Cũ nhất") :
                           (t.reservationsSortStatus || "Theo trạng thái")}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.preventDefault();
                          setSortBy("date-desc");
                        }}>
                          {t.reservationsSortNewest || "Mới nhất"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.preventDefault();
                          setSortBy("date-asc");
                        }}>
                          {t.reservationsSortOldest || "Cũ nhất"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.preventDefault();
                          setSortBy("status");
                        }}>
                          {t.reservationsSortStatus || "Theo trạng thái"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleRefresh}
                      title={t.reservationsRefresh || "Làm mới"}
                      className="hover:bg-primary-gradient"
                      disabled={isRefreshDisabled}
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
                        <ReservationCard
                          key={reservation.id}
                          reservation={reservation}
                          index={index}
                          getStatusLabel={getStatusLabel}
                          labels={{
                            date: t.reservationsDate || "Ngày",
                            time: t.reservationsTime || "Giờ",
                            guests: t.reservationsGuests || "Khách",
                            guest: t.reservationsGuest || "khách",
                            phone: t.reservationsPhone || "Điện thoại",
                            note: t.reservationsNote || "Ghi chú",
                            cancel: t.reservationsCancel || "Hủy",
                          }}
                        />
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
