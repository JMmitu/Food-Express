import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Clock, ArrowLeft, Plus, Minus, ShoppingCart, Store } from "lucide-react";
import { motion } from "motion/react";
import api from "../services/api";
import { useCart } from "../store/CartContext";
import { useToast } from "../store/ToastContext";
import { getErrorMessage } from "../utils/errorMessage";

interface Food {
  _id: string;
  name: string;
  price: number;
  img: string;
  category: string;
  description: string;
  restaurant: {
    _id: string;
    name: string;
    img: string;
    rating: number;
  };
}

const FoodDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { showToast } = useToast();

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function fetchFood() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const { data } = await api.get(`/food-items/${id}`);
        setFood(data);
        setQty(1);
      } catch (err) {
        setError(getErrorMessage(err, "This food item could not be found."));
      } finally {
        setLoading(false);
      }
    }

    fetchFood();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const inCartQty = food ? items.find((i) => i.id === food._id)?.quantity ?? 0 : 0;

  const handleAddToCart = () => {
    if (!food) return;

    for (let i = 0; i < qty; i++) {
      addItem({
        id: food._id,
        name: food.name,
        restaurant: food.restaurant.name,
        price: food.price,
        img: food.img,
      });
    }

    showToast(`${qty > 1 ? `${qty}x ` : ""}${food.name} added to cart`);
  };

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F9FAFB]">
        <h2 className="text-2xl font-bold text-gray-700">Loading...</h2>
      </section>
    );
  }

  if (error || !food) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#F9FAFB] px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{error ?? "Food item not found"}</h2>
        <Link
          to="/"
          className="rounded-2xl bg-[#FF6B35] px-6 py-3 font-semibold text-white hover:bg-[#e95f28]"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#F9FAFB] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#FF6B35]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:p-0"
        >
          <div className="h-64 overflow-hidden rounded-2xl lg:h-full lg:rounded-none">
            <img
              src={food.img}
              alt={food.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col p-0 pt-2 lg:p-8">
            {food.category && (
              <span className="mb-2 w-fit rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-bold text-[#FF6B35]">
                {food.category}
              </span>
            )}

            <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">{food.name}</h1>

            <button
              onClick={() => navigate(`/restaurant/${food.restaurant._id}`)}
              className="mt-2 flex w-fit items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#FF6B35]"
            >
              <Store size={15} />
              {food.restaurant.name}
            </button>

            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {food.restaurant.rating}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                25-30m delivery
              </span>
            </div>

            <p className="mt-5 leading-relaxed text-gray-600">
              {food.description || "A delicious dish prepared fresh, just for you."}
            </p>

            <div className="mt-6 text-3xl font-black text-[#FF6B35]">
              ${food.price.toFixed(2)}
            </div>

            {inCartQty > 0 && (
              <p className="mt-2 text-sm font-medium text-[#2E8B3D]">
                {inCartQty} already in your cart
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-full bg-gray-100 px-2 py-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="w-6 text-center font-bold text-gray-900">{qty}</span>

                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95f28] sm:flex-none"
              >
                <ShoppingCart size={17} />
                Add to Cart — ${(food.price * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodDetailsPage;
