import { useState } from "react";
import { Star, Clock, Plus, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../../store/CartContext";

const ALL_FOODS = [
  { id: 1, name: "Classic Smash Burger", restaurant: "Burger House", price: 12.99, rating: 4.8, time: "20-25", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format", tag: "Best Seller" },
  { id: 2, name: "Margherita Pizza", restaurant: "Pizza Palace", price: 15.49, rating: 4.7, time: "25-30", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format", tag: "Popular" },
  { id: 3, name: "Dragon Roll Sushi", restaurant: "Tokyo Kitchen", price: 18.99, rating: 4.9, time: "30-35", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=300&fit=crop&auto=format", tag: "Premium" },
  { id: 4, name: "Garden Fresh Salad", restaurant: "Green Bowl", price: 9.99, rating: 4.6, time: "15-20", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format", tag: "Healthy" },
  { id: 5, name: "Spicy Ramen Bowl", restaurant: "Noodle Bar", price: 13.49, rating: 4.7, time: "20-25", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format", tag: "Spicy" },
  { id: 6, name: "Chocolate Lava Cake", restaurant: "Sweet Tooth", price: 7.99, rating: 4.9, time: "10-15", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format", tag: "Dessert" },
  { id: 7, name: "Grilled Chicken Wings", restaurant: "Wing Zone", price: 14.99, rating: 4.8, time: "25-30", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format", tag: "Popular" },
  { id: 8, name: "Beef Tacos x3", restaurant: "Taco Fiesta", price: 11.99, rating: 4.6, time: "20-25", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop&auto=format", tag: "Trending" },
  { id: 9, name: "Butter Chicken", restaurant: "Spice Garden", price: 16.99, rating: 4.8, time: "25-35", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&auto=format", tag: "Popular" },
  { id: 10, name: "Pad Thai Noodles", restaurant: "Bangkok Kitchen", price: 13.99, rating: 4.7, time: "20-30", img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop&auto=format", tag: "Trending" },
  { id: 11, name: "Fish & Chips", restaurant: "The Chippy", price: 10.99, rating: 4.5, time: "20-25", img: "https://images.unsplash.com/photo-1576107232684-1279f8f1abb9?w=400&h=300&fit=crop&auto=format", tag: "Classic" },
  { id: 12, name: "Tiramisu", restaurant: "Bella Italia", price: 8.49, rating: 4.9, time: "5-10", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format", tag: "Dessert" },
];

const tagColors: Record<string, string> = {
  "Best Seller": "bg-[#FF6B35] text-white",
  "Popular": "bg-[#2F4858] text-white",
  "Premium": "bg-purple-600 text-white",
  "Healthy": "bg-[#22C55E] text-white",
  "Spicy": "bg-red-500 text-white",
  "Dessert": "bg-pink-500 text-white",
  "Trending": "bg-amber-500 text-white",
  "Classic": "bg-gray-600 text-white",
};

export function PopularFoodsSection() {
  const { addItem, items } = useCart();
  const [showAll, setShowAll] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  const displayed = showAll ? ALL_FOODS : ALL_FOODS.slice(0, 8);

  const handleAdd = (food: typeof ALL_FOODS[0]) => {
    addItem({ id: food.id, name: food.name, restaurant: food.restaurant, price: food.price, img: food.img });
    setAddedId(food.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const inCart = (id: number) => items.some((i) => i.id === id);

  return (
    <section id="foods" className="py-14 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 font-bold text-2xl">Popular Foods</h2>
            <p className="text-gray-500 text-sm mt-1">Our most ordered dishes this week</p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 text-[#FF6B35] text-sm font-bold border border-[#FF6B35]/30 hover:bg-[#FF6B35] hover:text-white transition-all rounded-xl px-4 py-2"
          >
            {showAll ? "Show Less" : "View All"}
            {!showAll && <span className="bg-[#FF6B35]/10 text-[#FF6B35] group-hover:bg-white/20 text-xs font-black px-1.5 py-0.5 rounded-md">{ALL_FOODS.length}</span>}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {displayed.map((food, i) => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="relative h-44 bg-gray-100">
                  <img src={food.img} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg ${tagColors[food.tag]}`}>{food.tag}</span>
                  <button
                    onClick={() => handleAdd(food)}
                    className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                      addedId === food.id ? "bg-[#22C55E] scale-110" : inCart(food.id) ? "bg-[#FF6B35]" : "bg-[#FF6B35] hover:bg-[#e85a24] hover:scale-110"
                    } text-white`}
                  >
                    {addedId === food.id ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sm">✓</motion.span>
                    ) : inCart(food.id) ? (
                      <ShoppingCart size={16} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-gray-900 font-bold text-sm leading-snug mb-1">{food.name}</p>
                  <p className="text-gray-500 text-xs mb-3">{food.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF6B35] font-black text-base">${food.price}</span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        {food.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {food.time}m
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All modal overlay */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
              onClick={() => setShowAll(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <div>
                    <h3 className="text-gray-900 font-bold text-xl">All Popular Foods</h3>
                    <p className="text-gray-500 text-sm">{ALL_FOODS.length} items available</p>
                  </div>
                  <button onClick={() => setShowAll(false)} className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition">
                    <X size={18} className="text-gray-600" />
                  </button>
                </div>
                <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ALL_FOODS.map((food) => (
                    <div key={food.id} className="flex gap-3 bg-gray-50 rounded-2xl p-3 hover:shadow-md transition-shadow">
                      <img src={food.img} alt={food.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-bold text-sm leading-snug truncate">{food.name}</p>
                        <p className="text-gray-400 text-xs mb-1">{food.restaurant}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#FF6B35] font-black text-sm">${food.price}</span>
                          <button
                            onClick={() => handleAdd(food)}
                            className="w-7 h-7 bg-[#FF6B35] hover:bg-[#e85a24] text-white rounded-lg flex items-center justify-center transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
