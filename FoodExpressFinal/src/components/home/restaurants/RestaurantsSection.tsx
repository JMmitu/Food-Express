import { useEffect, useState } from "react";
import { Star, Clock, ChevronRight, X, Search, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useSearch } from "../../../store/SearchContext";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  img: string;
  rating: number;
  deliveryTime: string;
  address: string;
}

export function RestaurantsSection() {
  const [showAll, setShowAll] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const navigate = useNavigate();
  const { query: globalQuery, clearFilters } = useSearch();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await api.get("/restaurants");
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const matches = (r: Restaurant, q: string) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;

    return (
      r.name.toLowerCase().includes(query) ||
      (r.cuisine ?? "").toLowerCase().includes(query) ||
      (r.address ?? "").toLowerCase().includes(query)
    );
  };

  // Grid on the main page reacts to the global hero search.
  const isFiltering = Boolean(globalQuery.trim());
  const globallyFiltered = restaurants.filter((r) => matches(r, globalQuery));
  const mainList = isFiltering ? globallyFiltered : restaurants;
  const displayed = mainList.slice(0, 6);

  // Modal has its own local search box.
  const filtered = restaurants.filter((r) => matches(r, modalSearch));

  const goToRestaurant = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          Loading Restaurants...
        </h2>
      </section>
    );
  }

  return (    
  <section id="restaurants" className="py-14 bg-[#F9FAFB] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 font-bold text-2xl">
              {isFiltering ? "Restaurants matching your search" : "Popular Restaurants"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {isFiltering
                ? `${mainList.length} ${mainList.length === 1 ? "restaurant" : "restaurants"} found for "${globalQuery}"`
                : "Top rated restaurants near you"}
            </p>
          </div>

          {isFiltering ? (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-[#FF6B35] text-sm font-bold border border-[#FF6B35]/30 hover:bg-[#FF6B35] hover:text-white transition-all rounded-xl px-4 py-2"
            >
              Clear Search
            </button>
          ) : (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1.5 text-[#FF6B35] text-sm font-bold border border-[#FF6B35]/30 hover:bg-[#FF6B35] hover:text-white transition-all rounded-xl px-4 py-2"
            >
              View All
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        {mainList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
            <SearchX size={32} className="text-gray-400" />
            <h3 className="text-lg font-bold text-gray-800">No results found</h3>
            <p className="max-w-sm text-sm text-gray-500">
              We couldn't find any restaurants matching your search. Try a different keyword.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 rounded-xl bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e85a24] transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => goToRestaurant(r._id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative h-40 bg-gray-100">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="px-4 pb-4 pt-3">
                <div className="flex items-start justify-between mb-2">

                  <div>
                    <p className="text-gray-900 font-bold text-base">
                      {r.name}
                    </p>

                    <p className="text-gray-500 text-xs mt-0.5">
                      {r.cuisine}
                    </p>
                  </div>

                  <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded-lg shrink-0">
                    <Star
                      size={11}
                      className="fill-amber-500 text-amber-500"
                    />

                    {r.rating}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">

                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {r.deliveryTime}
                  </span>

                  <span className="truncate">
                    {r.address}
                  </span>

                </div>

              </div>

            </motion.div>
          ))}
        </div>
        )}

      </div>

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
                          {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-100">

                <div className="flex items-center justify-between mb-4">

                  <div>
                    <h3 className="text-gray-900 font-bold text-xl">
                      All Restaurants
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {filtered.length} restaurants found
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAll(false)}
                    className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                  >
                    <X size={18} className="text-gray-600" />
                  </button>

                </div>

                {/* Search */}

                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 gap-2 mb-4">

                  <Search size={16} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />

                </div>

              </div>

              {/* Restaurant List */}

              <div className="overflow-y-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {filtered.length === 0 ? (

                  <div className="col-span-3 text-center py-10">

                    <h2 className="text-xl font-bold">
                      No Restaurant Found
                    </h2>

                  </div>

                ) : (

                  filtered.map((r) => (

                    <div
                      key={r._id}
                      onClick={() => {
                        setShowAll(false);
                        goToRestaurant(r._id);
                      }}
                      className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition cursor-pointer"
                    >

                      <div className="relative h-36">

                        <img
                          src={r.img}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <div className="p-4">

                        <div className="flex justify-between">

                          <h3 className="font-bold text-gray-900">
                            {r.name}
                          </h3>

                          <span className="flex items-center gap-1 text-amber-500 text-sm">

                            <Star
                              size={12}
                              className="fill-amber-500"
                            />

                            {r.rating}

                          </span>

                        </div>

                        <p className="text-gray-500 text-sm mt-1">
                          {r.cuisine}
                        </p>

                        <div className="flex justify-between mt-3 text-xs text-gray-500">

                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {r.deliveryTime}
                          </span>

                          <span>
                            {r.address}
                          </span>

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
