import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, Mail, Phone, User, Users } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { BookingFormValues, bookingSchema } from "./utils/bookingSchema"
import { guestOptions, timeSlots } from "./utils/const"

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log("Booking data:", data)
      toast.success("Đặt bàn thành công!", {
        description: "Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận.",
      })
      form.reset()
    } catch (error) {
      toast.error("Đặt bàn thất bại", {
        description: "Vui lòng thử lại sau.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-amber-200 bg-white/90 backdrop-blur shadow-xl">
      <CardHeader className="bg-primary-gradient text-white rounded-t-lg">
        <CardTitle className="text-2xl">Thông Tin Đặt Bàn</CardTitle>
        <CardDescription className="text-amber-100">
          Vui lòng điền đầy đủ thông tin bên dưới
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
                      Họ và tên
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập họ và tên của bạn" 
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
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập số điện thoại" 
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
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email@example.com" 
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
                      Ngày đặt bàn
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
                              <span>Chọn ngày</span>
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
                      Giờ
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500">
                          <SelectValue placeholder="Chọn giờ" />
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
                    Số lượng khách
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Chọn số lượng khách" />
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
                  <FormLabel>Yêu cầu đặc biệt (tùy chọn)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ví dụ: Dị ứng, chỗ ngồi gần cửa sổ, bánh sinh nhật..."
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Chúng tôi sẽ cố gắng đáp ứng yêu cầu của bạn trong khả năng có thể
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
              {isSubmitting ? "Đang xử lý..." : "Xác Nhận Đặt Bàn"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
