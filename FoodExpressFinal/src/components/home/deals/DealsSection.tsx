import { Tag, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const deals = [
  { id: 1, title: "50% OFF First Order", restaurant: "McDonald's", code: "FIRST50", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop&auto=format", color: "#FF6B35" },
  { id: 2, title: "Free Delivery Weekend", restaurant: "Pizza Hut", code: "FREEDEL", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop&auto=format", color: "#2F4858" },
  { id: 3, title: "Buy 1 Get 1 Free", restaurant: "KFC", code: "BOGOF23", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop&auto=format", color: "#22C55E" },
  { id: 4, title: "30% OFF Sushi Orders", restaurant: "Sushi Bar", code: "SUSHI30", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=300&h=200&fit=crop&auto=format", color: "#8B5CF6" },
  { id: 5, title: "Family Meal Deals", restaurant: "Burger King", code: "FAMILY", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop&auto=format", color: "#EF4444" },
];

export function DealsSection() {
  return (
    <section
  id="offers"
  className="py-12 bg-background scroll-mt-28"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
              <Tag size={18} className="text-[#FF6B35]" />
            </div>
            <div>
              <h2 className="text-gray-900 font-bold text-xl">Exclusive Deals</h2>
              <p className="text-gray-500 text-sm">Limited time offers just for you</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[#FF6B35] text-sm font-semibold hover:gap-2 transition-all">
            View All <ChevronRight size={16} />
          </button>
        </div>

        {/* Deal cards scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="relative h-36 bg-gray-100">
                <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ backgroundColor: deal.color }}
                >
                  DEAL
                </span>
              </div>
              <div className="p-4">
                <p className="text-gray-900 font-bold text-sm leading-snug mb-1">{deal.title}</p>
                <p className="text-gray-500 text-xs mb-3">{deal.restaurant}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-600 text-xs font-mono font-bold px-2 py-1 rounded-lg">
                    {deal.code}
                  </span>
                  <button className="text-[#FF6B35] text-xs font-semibold hover:underline">Claim →</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
