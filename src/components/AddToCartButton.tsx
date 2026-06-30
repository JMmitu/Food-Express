import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';

type AddToCartButtonProps = Omit<CartItem, 'quantity'>;

export default function AddToCartButton(props: AddToCartButtonProps) {
  const { items, addToCart, updateQuantity } = useCart();

  const cartItem = items.find(item => item.id === props.id);
  const quantity = cartItem?.quantity ?? 0;

  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(props)}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:scale-95 transition-all"
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-2 py-1">
      <button
        onClick={() => updateQuantity(props.id, quantity - 1)}
        className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
      >
        <Minus size={12} />
      </button>
      <span className="w-5 text-center font-bold text-orange-600 text-sm">
        {quantity}
      </span>
      <button
        onClick={() => updateQuantity(props.id, quantity + 1)}
        className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
      >
        <Plus size={12} />
      </button>
    </div>
  );
}