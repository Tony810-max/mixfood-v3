import { Card, CardContent } from "@/components/ui/card"
import { RESTAURANT_INFO } from "./utils/const"

export const BookingInfoCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {RESTAURANT_INFO.map((info, index) => (
        <Card key={index} className="border-amber-200 bg-white/80 backdrop-blur">
          <CardContent className="pt-6 flex items-center h-full">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-full">
                <info.icon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">{info.title}</p>
              <p className="text-sm text-amber-700">{info.desription}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      ))}
    </div>
  )
}
