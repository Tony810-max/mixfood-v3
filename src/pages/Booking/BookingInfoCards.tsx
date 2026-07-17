import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone } from "lucide-react"

export const BookingInfoCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="border-amber-200 bg-white/80 backdrop-blur">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-full">
              <MapPin className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Địa chỉ</p>
              <p className="text-sm text-amber-700">Đà Nẵng, Việt Nam</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-white/80 backdrop-blur">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-full">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Giờ mở cửa</p>
              <p className="text-sm text-amber-700">11:00 - 22:00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-white/80 backdrop-blur">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-full">
              <Phone className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Hotline</p>
              <p className="text-sm text-amber-700">0123 456 789</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
