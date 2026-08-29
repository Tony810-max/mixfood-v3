import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { getBookingRules } from "./utils/const"

export const BookingRules = () => {
  const { t } = useLanguage()
  const bookingRules = getBookingRules(t)

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-4">{t.bookingRulesTitle}</h3>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {bookingRules.map((rule, index) => (
          <Card key={index} className="border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10 backdrop-blur">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl mt-0.5 shrink-0">
                  <rule.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-200 text-sm">{rule.title}</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1">{rule.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
