import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/AuthContext";
import AuthModal from "../components/layout/AuthModal";

const DELIVERY_FEE = 2.99;

const CartPage = () => {
  const { items, updateQty, removeItem, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    navigate("/checkout");
  };

  const total = items.length > 0 ? totalPrice + DELIVERY_FEE : 0;

  return (
    <section className="min-h-[70vh] bg-[#F9FAFB] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#FF6B35]"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B35]/10">
              <ShoppingBag size={28} className="text-[#FF6B35]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-gray-500">Looks like you haven't added anything yet.</p>
            <Link
              to="/"
              className="mt-6 rounded-2xl bg-[#FF6B35] px-6 py-3 font-semibold text-white hover:bg-[#e95f28]"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="space-y-4 lg:col-span-2">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.restaurant}</p>
                      <p className="mt-1 font-bold text-[#FF6B35]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-full bg-gray-100 px-2 py-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-5 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">
                    ${DELIVERY_FEE.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#FF6B35]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full rounded-2xl bg-[#FF6B35] py-4 font-bold text-white transition hover:bg-[#e95f28]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </section>
  );
};

export default CartPage;
