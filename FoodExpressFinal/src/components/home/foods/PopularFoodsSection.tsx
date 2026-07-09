import { useEffect, useState } from "react";
import { Star, Clock, Plus, X, ShoppingCart, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../store/CartContext";
import { useSearch } from "../../../store/SearchContext";
import api from "../../../services/api";

interface Food {
  _id: string;
  name: string;
  price: number;
  img: string;
  category: string;
  description: string;

  restaurant: {
    _id: string;
    name: string;
    img: string;
    rating: number;
  };
}

export function PopularFoodsSection() {
  const { addItem, items } = useCart();
  const { query, categoryFilter, clearFilters } = useSearch();
  const navigate = useNavigate();

  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const { data } = await api.get("/food-items");

        // Backend returns:
        // {
        //   totalFoods,
        //   currentPage,
        //   totalPages,
        //   foods:[]
        // }

        setFoods(data.foods);
      } catch (err) {
        console.error("Failed to fetch foods", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
  }, []);

  const isFiltering = Boolean(query.trim()) || Boolean(categoryFilter);

  const filteredFoods = foods.filter((food) => {
    const q = query.trim().toLowerCase();

    const matchesQuery =
      !q ||
      food.name.toLowerCase().includes(q) ||
      (food.category ?? "").toLowerCase().includes(q) ||
      (food.restaurant?.name ?? "").toLowerCase().includes(q);

    const matchesCategory =
      !categoryFilter || (food.category ?? "").toLowerCase() === categoryFilter.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  const sourceList = isFiltering ? filteredFoods : foods;
  const displayed = showAll ? sourceList : sourceList.slice(0, 8);

  const handleAdd = (e: React.MouseEvent, food: Food) => {
    e.stopPropagation();

    addItem({
      id: food._id,
      name: food.name,
      restaurant: food.restaurant.name,
      price: food.price,
      img: food.img,
    });

    setAddedId(food._id);

    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  const inCart = (id: string) =>
    items.some((i) => i.id === id);

  const goToFood = (id: string) => {
    navigate(`/food/${id}`);
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          Loading Foods...
        </h2>
      </section>
    );
  }

  return (
    <section id="foods" className="py-14 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-gray-900 font-bold text-2xl">
              {isFiltering ? "Search Results" : "Popular Foods"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {isFiltering
                ? `${sourceList.length} ${sourceList.length === 1 ? "dish" : "dishes"} found${categoryFilter ? ` in "${categoryFilter}"` : ""}${query ? ` for "${query}"` : ""}`
                : "Our most ordered dishes this week"}
            </p>
          </div>

          {isFiltering ? (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-[#FF6B35] text-sm font-bold border border-[#FF6B35]/30 hover:bg-[#FF6B35] hover:text-white transition-all rounded-xl px-4 py-2"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1.5 text-[#FF6B35] text-sm font-bold border border-[#FF6B35]/30 hover:bg-[#FF6B35] hover:text-white transition-all rounded-xl px-4 py-2"
            >
              {showAll ? "Show Less" : "View All"}

              {!showAll && (
                <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-black px-1.5 py-0.5 rounded-md">
                  {foods.length}
                </span>
              )}
            </button>
          )}

        </div>

        {sourceList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
            <SearchX size={32} className="text-gray-400" />
            <h3 className="text-lg font-bold text-gray-800">No results found</h3>
            <p className="max-w-sm text-sm text-gray-500">
              We couldn't find any dishes matching your search. Try a different keyword or browse another category.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 rounded-xl bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e85a24] transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <AnimatePresence>

            {displayed.map((food, i) => (

              <motion.div
                key={food._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => goToFood(food._id)}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
              >

                <div className="relative h-44 bg-gray-100">

                  <img
                    src={food.img}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <button
                    onClick={(e) => handleAdd(e, food)}
                    className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
                    ${
                      addedId === food._id
                        ? "bg-[#22C55E] scale-110"
                        : inCart(food._id)
                        ? "bg-[#FF6B35]"
                        : "bg-[#FF6B35] hover:bg-[#e85a24] hover:scale-110"
                    }
                    text-white`}
                  >

                    {addedId === food._id ? (

                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-sm"
                      >
                        ✓
                      </motion.span>

                    ) : inCart(food._id) ? (

                      <ShoppingCart size={16} />

                    ) : (

                      <Plus size={17} />

                    )}

                  </button>

                </div>

                <div className="p-4">

                  <p className="text-gray-900 font-bold text-sm leading-snug mb-1">
                    {food.name}
                  </p>

                  <p className="text-gray-500 text-xs mb-3">
                    {food.restaurant.name}
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="text-[#FF6B35] font-black text-base">
                      ${food.price}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-gray-500">

                      <span className="flex items-center gap-1">

                        <Star
                          size={12}
                          className="text-amber-400 fill-amber-400"
                        />

                        {food.restaurant.rating}

                      </span>

                      <span className="flex items-center gap-1">

                        <Clock size={12} />

                        25-30m

                      </span>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>
        )}

        <AnimatePresence>

          {showAll && !isFiltering && (

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

                    <h3 className="text-gray-900 font-bold text-xl">
                      All Popular Foods
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {foods.length} items available
                    </p>

                  </div>

                  <button
                    onClick={() => setShowAll(false)}
                    className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                  >
                    <X size={18} className="text-gray-600" />
                  </button>

                </div>

                <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {foods.map((food) => (

                    <div
                      key={food._id}
                      onClick={() => {
                        setShowAll(false);
                        goToFood(food._id);
                      }}
                      className="flex gap-3 bg-gray-50 rounded-2xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                    >

                      <img
                        src={food.img}
                        alt={food.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">

                        <p className="text-gray-900 font-bold text-sm leading-snug truncate">
                          {food.name}
                        </p>

                        <p className="text-gray-400 text-xs mb-1">
                          {food.restaurant.name}
                        </p>

                        <div className="flex items-center justify-between">

                          <span className="text-[#FF6B35] font-black text-sm">
                            ${food.price}
                          </span>

                          <button
                            onClick={(e) => handleAdd(e, food)}
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
