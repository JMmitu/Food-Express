import { useCart } from '../../context/CartContext';

const menuItems = [
  { id: 'item-1', name: 'Kacchi Biryani', price: 250, image: '🍛', restaurant: 'FoodExpress Kitchen' },
  { id: 'item-2', name: 'Cheese Burger', price: 180, image: '🍔', restaurant: 'FoodExpress Kitchen' },
  { id: 'item-3', name: 'Chicken Pizza', price: 450, image: '🍕', restaurant: 'FoodExpress Kitchen' },
];

export default function Cart() {
  const { items, addToCart, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-10">
        🍔 Food Express Cart Module Test
      </h1>

      <div className="max-w-5xl mx-auto mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-5xl mb-3">{item.image}</div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4">Price: ৳{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-t pt-6">
          Your Cart 🛒
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-700">
                  <th className="py-2 font-semibold">Item</th>
                  <th className="py-2 font-semibold">Price</th>
                  <th className="py-2 font-semibold text-center">Quantity</th>
                  <th className="py-2 font-semibold">Total</th>
                  <th className="py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-800">{item.name}</td>
                    <td className="py-3 text-gray-600">৳{item.price}</td>
                    <td className="py-3">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-800 font-bold w-5"
                        >
                          −
                        </button>
                        <span className="font-semibold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-800 font-bold w-5"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-gray-800">৳{item.price * item.quantity}</td>
                    <td className="py-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-6">
              <span className="text-lg font-bold text-gray-800">Grand Total: </span>
              <span className="text-lg font-bold text-green-600">৳{totalPrice}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}