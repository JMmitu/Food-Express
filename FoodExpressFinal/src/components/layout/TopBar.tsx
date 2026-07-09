import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronRight, MapPin, X, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../../store/CartContext";
import { useLocationContext, CITIES } from "../../store/LocationContext";
import { useToast } from "../../store/ToastContext";

const TopBar: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const { city, setCity } = useLocationContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleSelectCity = (selected: string) => {
    setCity(selected);
    setShowLocationModal(false);
    showToast(`Delivery location set to ${selected}`);
  };

  return (
    <div className="bg-[#1A1A2E] text-white">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-3">

        {/* Offer */}
        <div className="flex items-center gap-2 text-[12px] sm:text-[13px]">
          <span>🛍️</span>

          <span>
            Get 5% Off your first order, Promo:
            <span className="ml-1 font-semibold text-[#F5821F]">
              ORDER5
            </span>
          </span>
        </div>

        {/* Location */}
        <div className="hidden items-center gap-2 text-[13px] md:flex">
          <span>📍</span>

          <span>
            FoodExpress, {city}
          </span>

          <button
            type="button"
            onClick={() => setShowLocationModal(true)}
            className="font-semibold text-[#F5821F] hover:underline"
          >
            Change location
          </button>
        </div>

        {/* Cart section */}
        <button
          type="button"
          onClick={() => navigate("/cart")}
          aria-label={`View cart, ${totalItems} items, total GBP ${totalPrice.toFixed(2)}`}
          className="group flex items-center self-start overflow-hidden rounded-full bg-[#2E8B3D] transition-colors hover:bg-[#267433] sm:self-auto"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium sm:px-4 sm:py-2 sm:text-[13px]">
            <ShoppingCart size={15} aria-hidden="true" />
            <span>
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
          </div>

          <div className="border-x border-white/20 px-3 py-1.5 text-[12px] font-semibold sm:px-4 sm:py-2 sm:text-[13px]">
            GBP {totalPrice.toFixed(2)}
          </div>

          <span className="flex items-center px-3 py-1.5 transition-transform group-hover:translate-x-0.5 sm:px-4 sm:py-2">
            <ChevronRight size={15} aria-hidden="true" />
          </span>
        </button>

      </div>

      {/* Change Location Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm p-4 sm:items-center"
            onClick={() => setShowLocationModal(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white text-[#1A1A2E] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#F5821F]" />
                  <h3 className="text-lg font-bold">Choose your city</h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLocationModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleSelectCity(c)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                        c === city
                          ? "border-[#F5821F] bg-[#F5821F]/10 text-[#F5821F]"
                          : "border-gray-200 text-gray-700 hover:border-[#F5821F]/50 hover:bg-gray-50"
                      }`}
                    >
                      {c}
                      {c === city && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopBar;
