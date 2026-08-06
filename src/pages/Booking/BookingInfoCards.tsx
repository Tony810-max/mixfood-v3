import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { getRestaurantInfo } from "./utils/const"

export const BookingInfoCards = () => {
  const { t } = useLanguage()
  const RESTAURANT_INFO = getRestaurantInfo(t)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      {RESTAURANT_INFO.map((info, index) => (
        <Card key={index} className="border-amber-200 bg-white/80 backdrop-blur">
          <CardContent className="pt-4 md:pt-6 flex items-center h-full">
            <div className="flex items-center gap-3">
              <div className="p-2.5 md:p-3 bg-amber-100 rounded-full shrink-0">
                <info.icon className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-amber-900 text-sm md:text-base">{info.title}</p>
                <p className="text-xs md:text-sm text-amber-700 break-words">{info.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
