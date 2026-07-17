import { BookingForm } from "./BookingForm"
import { BookingInfoCards } from "./BookingInfoCards"

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
            Đặt Bàn Online
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Đặt bàn trước để tận hưởng trải nghiệm ẩm thực Thái Lan tuyệt vời tại Mix Food Đà Nẵng
          </p>
        </div>

        <BookingInfoCards />
        <BookingForm />

        <div className="mt-8 text-center text-sm text-amber-700">
          <p>Bạn cần hỗ trợ? Gọi cho chúng tôi tại <a href="tel:0123456789" className="font-semibold hover:underline">0123 456 789</a></p>
        </div>
      </div>
    </div>
  )
}

export default Booking