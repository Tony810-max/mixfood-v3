import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Clock,
  Phone,
  Mail,
  Users,
  CalendarIcon,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

const ReserveContent = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.reservationSuccess,
      description: t.reservationSuccessDesc,
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-[72px]">
        <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              {t.reservePageTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-muted-foreground text-lg max-w-xl mx-auto"
            >
              {t.reservePageSub}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-card shadow-layered p-6 md:p-10 space-y-6"
            >
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-body font-medium text-foreground"
                  >
                    {t.fullName}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="font-body font-medium text-foreground"
                  >
                    {t.phoneNumber}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-body font-medium text-foreground"
                >
                  {t.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="font-body font-medium text-foreground">
                    {t.dateTime}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : t.datePlaceholder}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="font-body font-medium text-foreground">
                    &nbsp;
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.timePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label className="font-body font-medium text-foreground">
                  {t.numberOfGuests}
                </Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.guestsPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, "> 8"].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? t.guest : t.guests}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="font-body font-medium text-foreground"
                >
                  {t.specialRequests}
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.specialRequestsPlaceholder}
                  rows={4}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {t.reserveButton}
              </Button>
            </form>
          </motion.div>

          {/* Right: Info Cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Opening Hours */}
            <div className="rounded-2xl bg-card shadow-layered p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {t.openingHours}
                </h3>
              </div>
              <p className="font-body text-muted-foreground">
                {t.openingHoursValue}
              </p>
            </div>

            {/* Policy */}
            <div className="rounded-2xl bg-card shadow-layered p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {t.policy}
                </h3>
              </div>
              <ul className="space-y-3">
                {[t.policy1, t.policy2, t.policy3, t.policy4].map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-body text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="rounded-2xl bg-card shadow-layered p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {t.contact}
                </h3>
              </div>
              <div className="space-y-3 font-body text-sm">
                <div className="flex items-center gap-3 text-foreground">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{t.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{t.contactEmail}</span>
                </div>
                <p className="text-muted-foreground italic pt-2">
                  {t.contactNote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Reserve = () => (
  <LanguageProvider>
    <ReserveContent />
  </LanguageProvider>
);

export default Reserve;
