import { useState } from "react";
import { Star, Clock, ChevronRight, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ALL_RESTAURANTS = [
  { id: 1, name: "McDonald's", cuisine: "Burgers · Fast Food", rating: 4.5, time: "20-30", minOrder: 5, img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=300&fit=crop&auto=format", featured: true, delivery: "Free", tags: ["Burgers", "Fast Food"] },
  { id: 2, name: "Papa John's", cuisine: "Pizza · Italian", rating: 4.3, time: "25-35", minOrder: 8, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=300&fit=crop&auto=format", featured: false, delivery: "Free", tags: ["Pizza"] },
  { id: 3, name: "Tokyo Kitchen", cuisine: "Sushi · Japanese", rating: 4.8, time: "30-40", minOrder: 12, img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=300&fit=crop&auto=format", featured: true, delivery: "Free", tags: ["Sushi", "Japanese"] },
  { id: 4, name: "KFC", cuisine: "Chicken · Fast Food", rating: 4.4, time: "20-30", minOrder: 6, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=300&fit=crop&auto=format", featured: false, delivery: "Free", tags: ["Chicken", "Fast Food"] },
  { id: 5, name: "Burger King", cuisine: "Burgers · American", rating: 4.2, time: "20-30", minOrder: 5, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=300&fit=crop&auto=format", featured: false, delivery: "$1.99", tags: ["Burgers"] },
  { id: 6, name: "Subway", cuisine: "Sandwiches · Healthy", rating: 4.1, time: "15-25", minOrder: 4, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=300&fit=crop&auto=format", featured: false, delivery: "Free", tags: ["Sandwiches", "Healthy"] },
  { id: 7, name: "Spice Garden", cuisine: "Indian · Curry", rating: 4.8, time: "30-40", minOrder: 10, img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&h=300&fit=crop&auto=format", featured: true, delivery: "Free", tags: ["Indian"] },
  { id: 8, name: "Bangkok Kitchen", cuisine: "Thai · Asian", rating: 4.6, time: "25-35", minOrder: 9, img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=300&fit=crop&auto=format", featured: false, delivery: "Free", tags: ["Thai", "Asian"] },
  { id: 9, name: "Taco Fiesta", cuisine: "Mexican · Tacos", rating: 4.4, time: "20-30", minOrder: 7, img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=300&fit=crop&auto=format", featured: false, delivery: "$0.99", tags: ["Mexican"] },
];

const FILTERS = ["All", "Burgers", "Pizza", "Sushi", "Chicken", "Indian", "Thai", "Mexican", "Healthy"];

export function RestaurantsSection() {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ALL_RESTAURANTS.filter((r) => {
    const matchFilter = activeFilter === "All" || r.tags.includes(activeFilter);
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const displayed = ALL_RESTAURANTS.slice(0, 6);

  return (
    <section id="restaurants" className="py-14 bg-[#F9FAFB] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 font-bold text-2xl">Popular Restaurants</h2>
            <p className="text-gray-500 text-sm mt-1">Top rated restaurants near you</p>
          </div>
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-1.5 text-[#FF6B35] text-sm font-bold border border-[#FF6B35]/30 hover:bg-[#FF6B35] hover:text-white transition-all rounded-xl px-4 py-2"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative h-40 bg-gray-100">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {r.featured && (
                  <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-xs font-bold px-2 py-1 rounded-lg">Featured</span>
                )}
              </div>
              <div className="px-4 pb-4 pt-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-900 font-bold text-base">{r.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{r.cuisine}</p>
                  </div>
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded-lg shrink-0">
                    <Star size={11} className="fill-amber-500 text-amber-500" />
                    {r.rating}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {r.time} min</span>
                  <span>Min. ${r.minOrder}</span>
                  <span className={r.delivery === "Free" ? "text-[#22C55E] font-semibold" : "text-gray-500"}>{r.delivery === "Free" ? "Free delivery" : `${r.delivery} delivery`}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-5xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal header */}
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 font-bold text-xl">All Restaurants</h3>
                    <p className="text-gray-500 text-sm">{filtered.length} restaurants found</p>
                  </div>
                  <button onClick={() => setShowAll(false)} className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition">
                    <X size={18} className="text-gray-600" />
                  </button>
                </div>
                {/* Search */}
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 gap-2 mb-4">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants or cuisines..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-gray-800 text-sm outline-none"
                  />
                </div>
                {/* Filter pills */}
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                        activeFilter === f ? "bg-[#FF6B35] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Restaurant list */}
              <div className="overflow-y-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-gray-600 font-semibold">No restaurants found</p>
                    <p className="text-gray-400 text-sm mt-1">Try a different search or filter</p>
                  </div>
                ) : (
                  filtered.map((r) => (
                    <div key={r.id} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="relative h-32 bg-gray-200">
                        <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {r.featured && (
                          <span className="absolute top-2 left-2 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">Featured</span>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-gray-900 font-bold text-sm">{r.name}</p>
                          <span className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                            <Star size={10} className="fill-amber-500" /> {r.rating}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">{r.cuisine}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{r.time} min</span>
                          <span className={r.delivery === "Free" ? "text-[#22C55E] font-semibold" : ""}>{r.delivery === "Free" ? "Free delivery" : r.delivery}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
