import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCreateReservation } from "@/hooks/api/useReservations"
import { BOOKING_WINDOW, VALIDATION } from "@/constants"
import { ROUTES } from "@/utils/const"
import { logger } from "@/utils/logger"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, Mail, Phone, User, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { BookingFormValues, bookingSchema } from "./utils/bookingSchema"

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user } = useAuth()
  const createReservation = useCreateReservation()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [minTime, setMinTime] = useState<string>("09:00")

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      date: new Date(),
      guests: 1, // Number to match schema transformation
      specialRequests: "",
    },
  })

  // Calculate initial minTime when component mounts
  useEffect(() => {
    const now = new Date()
    const minReservationTime = new Date(now.getTime() + VALIDATION.MIN_ADVANCE_BOOKING_MINUTES * 60 * 1000)
    const hours = minReservationTime.getHours().toString().padStart(2, '0')
    const minutes = minReservationTime.getMinutes().toString().padStart(2, '0')
    setMinTime(`${hours}:${minutes}`)
  }, [])

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true)
    try {
      logger.debug('Booking form submitted with data:', data)
      
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        reservationDate: data.date.toISOString(),
        reservationTime: data.time,
        numberOfGuests: Number(data.guests), // Convert to number for API
        note: data.specialRequests || undefined,
        userId: user?.id,
      }
      
      logger.debug('Sending reservation payload:', payload)
      
      await createReservation.mutateAsync(payload)
      
      form.reset()
      navigate(ROUTES.BOOKING_SUCCESS)
    } catch (error) {
      logger.error('Reservation creation failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue('date', date)
      setIsCalendarOpen(false)
      
      // Calculate minimum time based on selected date
      const now = new Date()
      const selectedDate = new Date(date)
      selectedDate.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate.getTime() === today.getTime()) {
        // If today, minimum time is current time + advance booking window
        const minReservationTime = new Date(now.getTime() + VALIDATION.MIN_ADVANCE_BOOKING_MINUTES * 60 * 1000)
        const hours = minReservationTime.getHours().toString().padStart(2, '0')
        const minutes = minReservationTime.getMinutes().toString().padStart(2, '0')
        setMinTime(`${hours}:${minutes}`)
      } else {
        // If future date, minimum time is opening time (09:00)
        setMinTime("09:00")
      }
    }
  }

  return (
    <Card className="border-amber-200 bg-white/90 backdrop-blur shadow-xl">
      <CardHeader className="bg-primary-gradient text-white rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl">{t.bookingFormTitle}</CardTitle>
        <CardDescription className="text-amber-100 text-sm md:text-base">
          {t.bookingFormDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t.fullName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.fullNamePlaceholder}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 h-10 md:h-auto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t.phoneNumber}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.phonePlaceholder}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 h-10 md:h-auto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t.email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.emailPlaceholder}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 h-10 md:h-auto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                      <CalendarIcon className="h-4 w-4" />
                      {t.bookingDate}
                    </FormLabel>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal border-amber-200 focus:border-amber-500 focus:ring-amber-500 hover:bg-primary-gradient hover:text-white hover:border-transparent ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>{t.bookingSelectDate}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={handleDateSelect}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          initialFocus
                          className="rounded-lg border-amber-200"
                          classNames={{
                            day: "h-9 w-9 p-0 font-normal aria-selected:bg-primary-gradient aria-selected:text-white hover:bg-primary-gradient hover:text-white transition-colors",
                            day_today: "bg-primary-gradient text-white",
                            day_selected: "bg-primary-gradient text-white hover:bg-primary-gradient hover:text-white",
                            day_disabled: "text-muted-foreground opacity-50",
                                  }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {t.bookingTime}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        min={minTime}
                        max={BOOKING_WINDOW.LAST_BOOKING}
                        placeholder={t.bookingTimePlaceholder}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 h-10 md:h-auto"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-amber-600">
                      {t.bookingTimeHelp}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t.numberOfGuests}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      placeholder={t.bookingGuestsPlaceholder}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 h-10 md:h-auto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.bookingSpecialRequests}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.bookingSpecialRequestsPlaceholder}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 resize-none text-sm md:text-base"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t.bookingSpecialRequestsDesc}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary-gradient hover:opacity-90 text-white font-semibold py-3 md:py-6 text-base md:text-lg min-h-[44px] md:min-h-[56px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.bookingSubmitting : t.bookingSubmitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
