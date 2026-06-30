import { useEffect, useState } from "react";
import api from "../../services/api";

interface Restaurant {
  _id: string;
  name: string;
  img?: string;
  rating?: number;
}

interface FoodItem {
  _id: string;
  name: string;
  price: number;
  category?: string;
  img?: string;
  restaurant?: Restaurant;
}

function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [restaurantRes, foodRes] = await Promise.all([
          api.get("/restaurants"),
          api.get("/fooditems"),
        ]);

        setRestaurants(restaurantRes.data);
        setFoodItems(foodRes.data);
      } catch (err) {
        console.error(err);
        setError("Data load করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <h1>Welcome to FoodExpress</h1>
      <p>Delicious food, delivered fast.</p>

      <section>
        <h2>Restaurants</h2>
        <div className="restaurant-list">
          {restaurants.length === 0 && <p>কোনো restaurant পাওয়া যায়নি।</p>}
          {restaurants.map((r) => (
            <div key={r._id} className="restaurant-card">
              {r.img && <img src={r.img} alt={r.name} width={150} />}
              <h3>{r.name}</h3>
              {r.rating !== undefined && <p>⭐ {r.rating}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Popular Food Items</h2>
        <div className="fooditem-list">
          {foodItems.length === 0 && <p>কোনো food item পাওয়া যায়নি।</p>}
          {foodItems.map((item) => (
            <div key={item._id} className="fooditem-card">
              {item.img && <img src={item.img} alt={item.name} width={150} />}
              <h3>{item.name}</h3>
              {item.category && <p className="category">{item.category}</p>}
              <p>৳ {item.price}</p>
              {item.restaurant?.name && (
                <p className="restaurant-name">{item.restaurant.name}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;