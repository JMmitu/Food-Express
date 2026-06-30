import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

export default function CartSummary() {
  const { totalPrice, totalItems, clearCart } = useCart();

  const tax = totalPrice * TAX_RATE;
  const grandTotal = totalPrice + DELIVERY_FEE + tax;

  if (totalItems === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>৳{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>৳{DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (5%)</span>
          <span>৳{tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-gray-800 text-base">
          <span>Total</span>
          <span className="text-orange-500">৳{grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full mt-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2">
        <ShoppingBag size={18} />
        Proceed to Checkout
      </button>
      <button
        onClick={clearCart}
        className="w-full mt-2 py-2 text-sm text-red-400 hover:text-red-600 transition-colors"
      >
        Clear Cart
      </button>
    </div>
  );
}