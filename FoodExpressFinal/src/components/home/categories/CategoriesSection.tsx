import { useState } from "react";
import { motion } from "motion/react";

const categories = [
  { id: 1, name: "Burgers", emoji: "🍔", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&auto=format" },
  { id: 2, name: "Pizza", emoji: "🍕", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&auto=format" },
  { id: 3, name: "Sushi", emoji: "🍣", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=200&h=200&fit=crop&auto=format" },
  { id: 4, name: "Salads", emoji: "🥗", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&auto=format" },
  { id: 5, name: "Noodles", emoji: "🍜", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&auto=format" },
  { id: 6, name: "Desserts", emoji: "🍰", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop&auto=format" },
  { id: 7, name: "Drinks", emoji: "🥤", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&auto=format" },
  { id: 8, name: "Tacos", emoji: "🌮", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop&auto=format" },
  { id: 9, name: "Chicken", emoji: "🍗", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop&auto=format" },
  { id: 10, name: "Seafood", emoji: "🦞", img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop&auto=format" },
];

export function CategoriesSection() 
{
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
  id="popular-categories"
  className="py-12 bg-background scroll-mt-28"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 font-bold text-2xl">Popular Categories</h2>
            <p className="text-gray-500 text-sm mt-1">What are you craving today?</p>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActive(active === cat.id ? null : cat.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                  active === cat.id
                    ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/30 scale-110"
                    : "border-white shadow-md group-hover:border-[#FF6B35]/50 group-hover:scale-105"
                }`}
                style={{ borderWidth: 3 }}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  active === cat.id ? "text-[#FF6B35]" : "text-gray-700 group-hover:text-[#FF6B35]"
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
