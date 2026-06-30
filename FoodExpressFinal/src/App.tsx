import HomePage from "./pages/HomePage";
import { CartProvider } from "./store/CartContext";

function App() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}

export default App;
