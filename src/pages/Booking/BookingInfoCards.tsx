import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { getRestaurantInfo } from "./utils/const"

export const BookingInfoCards = () => {
  const { t } = useLanguage()
  const RESTAURANT_INFO = getRestaurantInfo(t)

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
              <p className="text-sm text-amber-700">{info.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      ))}
    </div>
  )
}
