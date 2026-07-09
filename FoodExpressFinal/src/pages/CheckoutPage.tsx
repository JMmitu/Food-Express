import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Wallet, CreditCard, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import { getErrorMessage } from "../utils/errorMessage";
import { useCart } from "../store/CartContext";

const DELIVERY_FEE = 2.99;

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const total = totalPrice + DELIVERY_FEE;

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/orders", {
        deliveryAddress: address.trim(),
        paymentMethod,
      });

      clearCart();
      setPlacedOrderId(data._id);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to place order. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (placedOrderId) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F9FAFB] px-4 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2E8B3D]/10">
            <CheckCircle2 size={32} className="text-[#2E8B3D]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
          <p className="mt-2 text-gray-500">
            Your order <span className="font-mono font-semibold text-gray-700">#{placedOrderId.slice(-6).toUpperCase()}</span> has been confirmed.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="w-full rounded-2xl bg-[#FF6B35] py-3.5 font-bold text-white hover:bg-[#e95f28]"
            >
              View My Orders
            </button>
            <Link
              to="/"
              className="w-full rounded-2xl border border-gray-200 py-3.5 text-center font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F9FAFB] px-4 py-10 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Add something delicious before checking out.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-2xl bg-[#FF6B35] px-6 py-3 font-semibold text-white hover:bg-[#e95f28]"
          >
            Browse Restaurants
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#F9FAFB] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#FF6B35]"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Delivery Address */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-[#FF6B35]" />
                <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
              </div>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Street, Area, City"
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
              />
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Payment Method</h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition ${
                    paymentMethod === "cash"
                      ? "border-[#FF6B35] bg-[#FF6B35]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Wallet size={20} className={paymentMethod === "cash" ? "text-[#FF6B35]" : "text-gray-400"} />
                  <div>
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when it arrives</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition ${
                    paymentMethod === "card"
                      ? "border-[#FF6B35] bg-[#FF6B35]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard size={20} className={paymentMethod === "card" ? "text-[#FF6B35]" : "text-gray-400"} />
                  <div>
                    <p className="font-semibold text-gray-900">Card</p>
                    <p className="text-xs text-gray-500">Pay online</p>
                  </div>
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>

            <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="truncate text-gray-600">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="shrink-0 font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-gray-900">${DELIVERY_FEE.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-[#FF6B35]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-[#FF6B35] py-4 font-bold text-white transition hover:bg-[#e95f28] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
