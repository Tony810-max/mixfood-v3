import Header from "@/components/layout/Header"
import { useLanguage } from "@/contexts/LanguageContext"
import { INFORMATION_RESTAURANT } from "@/utils/const"
import { motion } from "framer-motion"
import { BookingForm } from "./BookingForm"
import { BookingInfoCards } from "./BookingInfoCards"
import { BookingRules } from "./BookingRules"

const Booking = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <div className="pt-20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
              {t.reservePageTitle}
            </h1>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              {t.reservePageSub}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <BookingInfoCards />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <BookingRules />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <BookingForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-amber-700"
          >
            <p>{t.contactNote} <a href={`tel:${INFORMATION_RESTAURANT.phone.replace(/\s/g, "")}`} className="font-semibold hover:underline">{INFORMATION_RESTAURANT.phone}</a></p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Booking