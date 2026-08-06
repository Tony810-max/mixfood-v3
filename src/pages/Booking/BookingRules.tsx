import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { getBookingRules } from "./utils/const"

export const BookingRules = () => {
  const { t } = useLanguage()
  const bookingRules = getBookingRules(t)

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">Quy định đặt bàn</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookingRules.map((rule, index) => (
          <Card key={index} className="border-amber-200 bg-amber-50/50 backdrop-blur">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-full mt-1">
                  <rule.icon className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-900 text-sm">{rule.title}</p>
                  <p className="text-xs text-amber-700 mt-1">{rule.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
