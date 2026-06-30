import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CartItem as CartItemType } from '../types/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.restaurant}</p>
        <p className="text-orange-500 font-bold mt-1">
          ৳{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-100 transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-semibold text-gray-700">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-400 hover:text-red-600 transition-colors p-1"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}