import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/LanguageContext"
import { getApiErrorMessage } from "@/services/api"
import { reservationService } from "@/services/reservation.service"
import { ROUTES } from "@/utils/const"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, Mail, Phone, User, Users } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { BookingFormValues, bookingSchema } from "./utils/bookingSchema"
import { getGuestOptions, timeSlots } from "./utils/const"

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()
  const guestOptions = getGuestOptions()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      guests: "",
      specialRequests: "",
    },
  })

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true)
    try {
      await reservationService.create({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        reservationDate: data.date.toISOString(),
        reservationTime: data.time,
        numberOfGuests: parseInt(data.guests),
        note: data.specialRequests || undefined,
      })
      
      toast.success("Đặt bàn thành công!", {
        description: "Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận.",
      })
      form.reset()
      navigate(ROUTES.BOOKING_SUCCESS)
    } catch (error) {
      toast.error("Đặt bàn thất bại", {
        description: getApiErrorMessage(error),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-amber-200 bg-white/90 backdrop-blur shadow-xl">
      <CardHeader className="bg-primary-gradient text-white rounded-t-lg">
        <CardTitle className="text-2xl">{t.bookingFormTitle}</CardTitle>
        <CardDescription className="text-amber-100">
          {t.bookingFormDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
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
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
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
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {t.bookingDate}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal border-amber-200 focus:border-amber-500 focus:ring-amber-500 ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>{t.bookingSelectDate}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500">
                          <SelectValue placeholder={t.bookingSelectTime} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder={t.bookingSelectGuests} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {guestOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                      rows={4}
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
              className="w-full bg-primary-gradient hover:opacity-90 text-white font-semibold py-6 text-lg"
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
