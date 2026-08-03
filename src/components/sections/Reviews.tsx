import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    name: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    en: "The Tom Yum Goong was absolutely divine! Authentic flavors that transported me straight to Bangkok. The ambiance is warm and elegant.",
    vi: "Tom Yum Goong thật tuyệt vời! Hương vị đích thực đưa tôi trở lại Bangkok. Không gian ấm cúng và sang trọng.",
  },
  {
    name: "Nguyễn Minh Tuấn",
    avatar: "NT",
    rating: 5,
    en: "Best Thai food in Da Nang, hands down. The Green Curry is perfectly balanced. We come here every weekend now.",
    vi: "Đồ ăn Thái ngon nhất Đà Nẵng. Cà Ri Xanh cân bằng hoàn hảo. Tuần nào chúng tôi cũng đến đây.",
  },
  {
    name: "James Chen",
    avatar: "JC",
    rating: 5,
    en: "From the Pad Thai to the Mango Sticky Rice, everything was exceptional. The staff is incredibly welcoming. A must-visit!",
    vi: "Từ Pad Thai đến Xôi Xoài, mọi thứ đều xuất sắc. Nhân viên rất thân thiện. Nhất định phải ghé!",
  },
];

const Reviews = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
        >
          {t.reviews}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="bg-card rounded-2xl p-6 shadow-layered space-y-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed italic">
                "{lang === "vi" ? review.vi : review.en}"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                  {review.avatar}
                </div>
                <span className="font-medium text-sm text-foreground">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
