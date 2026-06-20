import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  { id: 1, name: "Sarah Johnson", role: "Food Enthusiast", rating: 5, comment: "FoodExpress is incredible! The delivery is always on time and the food arrives hot. I've tried so many new restaurants through the app!", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5a4?w=80&h=80&fit=crop&auto=format" },
  { id: 2, name: "Michael Chen", role: "Regular Customer", rating: 5, comment: "Best food delivery app I've used. The live tracking is super accurate and customer support is always helpful. Highly recommend!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
  { id: 3, name: "Emma Wilson", role: "Office Manager", rating: 5, comment: "We use FoodExpress for all our office lunches. The group order feature is brilliant and the delivery is always fast.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
];

export function TestimonialsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-gray-900 font-bold text-2xl mb-2">What Our Customers Say</h2>
          <p className="text-gray-500 text-sm">Trusted by thousands of happy customers</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
