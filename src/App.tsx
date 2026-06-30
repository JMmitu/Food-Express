import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
}

export default App;