import { useEffect, useState } from "react";
import { Tag, ChevronRight, X, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useToast } from "../../../store/ToastContext";

interface Deal {
  _id: string;
  title: string;
  code: string;
  img: string;
  color: string;
  restaurant: {
    _id: string;
    name: string;
  };
}

export function DealsSection() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeals() {
      try {
        const { data } = await api.get("/deals");
        setDeals(data);
      } catch (err) {
        console.error("Failed to fetch deals", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  const handleClaim = async (deal: Deal) => {
    try {
      await navigator.clipboard.writeText(deal.code);
    } catch {
      // Clipboard API may be unavailable — the code is still shown to the user.
    }

    setCopiedCode(deal.code);
    showToast(`Code "${deal.code}" copied — apply it at checkout!`);

    setTimeout(() => setCopiedCode((c) => (c === deal.code ? null : c)), 1600);
  };

  const handleCardClick = (deal: Deal) => {
    if (deal.restaurant?._id) {
      navigate(`/restaurant/${deal.restaurant._id}`);
    }
  };

  if (loading) {
    return (
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold">
          Loading Deals...
        </h2>
      </section>
    );
  }

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
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-1 text-[#FF6B35] text-sm font-semibold hover:gap-2 transition-all"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>

        {/* Deal cards scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {deals.map((deal, i) => (
            <motion.div
              key={deal._id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleCardClick(deal)}
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
                <p className="text-gray-500 text-xs mb-3">{deal.restaurant?.name}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-600 text-xs font-mono font-bold px-2 py-1 rounded-lg">
                    {deal.code}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClaim(deal);
                    }}
                    className="flex items-center gap-1 text-[#FF6B35] text-xs font-semibold hover:underline"
                  >
                    {copiedCode === deal.code ? (
                      <>
                        <Check size={12} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Claim
                      </>
                    )}
                  </button>
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
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h3 className="text-gray-900 font-bold text-xl">All Deals</h3>
                  <p className="text-gray-500 text-sm">{deals.length} offers available</p>
                </div>

                <button
                  onClick={() => setShowAll(false)}
                  className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {deals.map((deal) => (
                  <div
                    key={deal._id}
                    onClick={() => {
                      setShowAll(false);
                      handleCardClick(deal);
                    }}
                    className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition cursor-pointer"
                  >
                    <div className="relative h-32">
                      <img src={deal.img} alt={deal.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-gray-900 text-sm">{deal.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 mb-3">{deal.restaurant?.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-white border border-gray-200 text-gray-600 text-xs font-mono font-bold px-2 py-1 rounded-lg">
                          {deal.code}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClaim(deal);
                          }}
                          className="flex items-center gap-1 text-[#FF6B35] text-xs font-semibold hover:underline"
                        >
                          {copiedCode === deal.code ? (
                            <>
                              <Check size={12} /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Claim
                            </>
                          )}
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
    </section>
  );
}
