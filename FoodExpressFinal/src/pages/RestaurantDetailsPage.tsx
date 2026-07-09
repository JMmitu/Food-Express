import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Clock, MapPin, ArrowLeft, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import api from "../services/api";
import { useCart } from "../store/CartContext";
import { useToast } from "../store/ToastContext";
import { getErrorMessage } from "../utils/errorMessage";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  img: string;
  rating: number;
  deliveryTime: string;
  address: string;
}

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

const RestaurantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { showToast } = useToast();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const [restaurantRes, menuRes] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/food-items`, { params: { restaurant: id, limit: 50 } }),
        ]);

        setRestaurant(restaurantRes.data);
        setMenu(menuRes.data.foods ?? []);
      } catch (err) {
        setError(getErrorMessage(err, "This restaurant could not be found."));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const inCart = (foodId: string) => items.some((i) => i.id === foodId);

  const handleAdd = (food: Food) => {
    addItem({
      id: food._id,
      name: food.name,
      restaurant: food.restaurant?.name ?? restaurant?.name ?? "",
      price: food.price,
      img: food.img,
    });

    showToast(`${food.name} added to cart`);
  };

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F9FAFB]">
        <h2 className="text-2xl font-bold text-gray-700">Loading...</h2>
      </section>
    );
  }

  if (error || !restaurant) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#F9FAFB] px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{error ?? "Restaurant not found"}</h2>
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
    <section className="min-h-[70vh] bg-[#F9FAFB] pb-14">
      {/* Hero banner */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <img src={restaurant.img} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur hover:bg-white sm:left-8 sm:top-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="absolute bottom-0 left-0 w-full px-4 pb-5 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-black text-white sm:text-4xl">{restaurant.name}</h1>
            <p className="mt-1 text-sm text-white/80 sm:text-base">{restaurant.cuisine}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Info bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 shadow-sm sm:gap-8"
        >
          <span className="flex items-center gap-1.5 text-sm font-bold text-amber-600">
            <Star size={16} className="fill-amber-500 text-amber-500" />
            {restaurant.rating} Rating
          </span>

          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Clock size={16} />
            {restaurant.deliveryTime}
          </span>

          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <MapPin size={16} />
            {restaurant.address}
          </span>
        </motion.div>

        {/* Menu */}
        <h2 className="mb-5 text-xl font-bold text-gray-900">Menu</h2>

        {menu.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
            <p className="text-gray-500">This restaurant hasn't added any dishes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((food, i) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/food/${food._id}`)}
                className="group flex cursor-pointer gap-3 rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={food.img}
                  alt={food.name}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate font-bold text-gray-900">{food.name}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                    {food.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-black text-[#FF6B35]">${food.price.toFixed(2)}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(food);
                      }}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-white transition ${
                        inCart(food._id)
                          ? "bg-[#2E8B3D] hover:bg-[#267433]"
                          : "bg-[#FF6B35] hover:bg-[#e85a24]"
                      }`}
                      aria-label={`Add ${food.name} to cart`}
                    >
                      {inCart(food._id) ? <ShoppingCart size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantDetailsPage;
