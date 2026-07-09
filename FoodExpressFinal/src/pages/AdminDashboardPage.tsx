import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  Users as UsersIcon,
  DollarSign,
  Trash2,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import api from "../services/api";
import { getErrorMessage } from "../utils/errorMessage";

// ============================================================
// Types
// ============================================================

interface Stats {
  totalUsers: number;
  totalRestaurants: number;
  totalFoods: number;
  totalOrders: number;
  totalRevenue: number;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

interface AdminOrder {
  _id: string;
  user: { _id: string; name: string; email: string } | null;
  items: { name: string; quantity: number; price: number }[];
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
}

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  img: string;
  rating: number;
  deliveryTime: string;
  address: string;
}

interface FoodItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  img: string;
  description: string;
  restaurant: { _id: string; name: string } | string;
}

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "preparing",
  "out-for-delivery",
  "delivered",
  "cancelled",
];

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "restaurants", label: "Restaurants", icon: Store },
  { id: "foods", label: "Food Items", icon: UtensilsCrossed },
  { id: "users", label: "Users", icon: UsersIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ============================================================
// Main Page
// ============================================================

const AdminDashboardPage = () => {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <section className="min-h-[80vh] bg-[#F9FAFB] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                tab === id
                  ? "bg-[#1A1A2E] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "restaurants" && <RestaurantsTab />}
        {tab === "foods" && <FoodsTab />}
        {tab === "users" && <UsersTab />}
      </div>
    </section>
  );
};

export default AdminDashboardPage;

// ============================================================
// Overview
// ============================================================

const OverviewTab = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then(({ data }) => setStats(data))
      .catch((err) => console.error("Failed to load stats", err));
  }, []);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers, icon: UsersIcon, color: "#8B5CF6" },
    { label: "Restaurants", value: stats?.totalRestaurants, icon: Store, color: "#F5821F" },
    { label: "Food Items", value: stats?.totalFoods, icon: UtensilsCrossed, color: "#2E8B3D" },
    { label: "Total Orders", value: stats?.totalOrders, icon: ShoppingBag, color: "#3B82F6" },
    {
      label: "Total Revenue",
      value: stats ? `$${stats.totalRevenue.toFixed(2)}` : undefined,
      icon: DollarSign,
      color: "#FF6B35",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
          <div
            className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${card.color}1A` }}
          >
            <card.icon size={20} style={{ color: card.color }} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {card.value ?? "—"}
          </p>
          <p className="mt-1 text-sm text-gray-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// Orders
// ============================================================

const OrdersTab = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await api.get("/admin/orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this order permanently?")) return;

    try {
      await api.delete(`/admin/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-5 py-4 font-mono text-xs text-gray-500">
                  #{order._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-900">{order.user?.name ?? "Deleted user"}</p>
                  <p className="text-xs text-gray-400">{order.user?.email}</p>
                </td>
                <td className="px-5 py-4 text-gray-600">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                </td>
                <td className="px-5 py-4 font-bold text-[#FF6B35]">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold capitalize outline-none focus:border-[#FF6B35]"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/-/g, " ")}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="px-5 py-10 text-center text-gray-500">No orders yet.</p>
        )}
      </div>
    </div>
  );
};

// ============================================================
// Restaurants
// ============================================================

const emptyRestaurant = { name: "", cuisine: "", img: "", rating: 4.5, deliveryTime: "20-30m", address: "" };

const RestaurantsTab = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await api.get("/restaurants");
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to load restaurants", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this restaurant? Its food items will remain but become unlinked.")) return;

    try {
      await api.delete(`/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete restaurant", err);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e95f28]"
        >
          <Plus size={16} />
          Add Restaurant
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading restaurants...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r) => (
            <div key={r._id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src={r.img} alt={r.name} className="h-32 w-full object-cover" />
              <div className="p-4">
                <p className="font-bold text-gray-900">{r.name}</p>
                <p className="text-sm text-gray-500">{r.cuisine}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(r);
                      setShowForm(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <RestaurantFormModal
          initial={editing ?? emptyRestaurant}
          isEdit={!!editing}
          onClose={() => setShowForm(false)}
          onSaved={(saved) => {
            setRestaurants((prev) =>
              editing ? prev.map((r) => (r._id === saved._id ? saved : r)) : [saved, ...prev]
            );
            setShowForm(false);
          }}
          restaurantId={editing?._id}
        />
      )}
    </div>
  );
};

interface RestaurantFormModalProps {
  initial: Omit<Restaurant, "_id"> | Restaurant;
  isEdit: boolean;
  restaurantId?: string;
  onClose: () => void;
  onSaved: (r: Restaurant) => void;
}

const RestaurantFormModal = ({ initial, isEdit, restaurantId, onClose, onSaved }: RestaurantFormModalProps) => {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");

    try {
      const { data } = isEdit
        ? await api.put(`/restaurants/${restaurantId}`, form)
        : await api.post("/restaurants", form);

      onSaved(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save restaurant."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Restaurant" : "Add Restaurant"}
          </h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />
          <input
            placeholder="Cuisine"
            value={form.cuisine}
            onChange={(e) => handleChange("cuisine", e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />
          <input
            placeholder="Image URL"
            value={form.img}
            onChange={(e) => handleChange("img", e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating"
              value={form.rating}
              onChange={(e) => handleChange("rating", Number(e.target.value))}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
            />
            <input
              placeholder="Delivery Time (e.g. 20-30m)"
              value={form.deliveryTime}
              onChange={(e) => handleChange("deliveryTime", e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
            />
          </div>
          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full rounded-2xl bg-[#FF6B35] py-3.5 font-bold text-white hover:bg-[#e95f28] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Restaurant"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Food Items
// ============================================================

const FoodsTab = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FoodItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [foodsRes, restaurantsRes] = await Promise.all([
          api.get("/food-items", { params: { limit: 100 } }),
          api.get("/restaurants"),
        ]);

        setFoods(foodsRes.data.foods);
        setRestaurants(restaurantsRes.data);
      } catch (err) {
        console.error("Failed to load food items", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this food item?")) return;

    try {
      await api.delete(`/food-items/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Failed to delete food item", err);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          disabled={restaurants.length === 0}
          className="flex items-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e95f28] disabled:opacity-50"
        >
          <Plus size={16} />
          Add Food Item
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading food items...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Item</th>
                  <th className="px-5 py-3">Restaurant</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {foods.map((f) => (
                  <tr key={f._id}>
                    <td className="flex items-center gap-3 px-5 py-3">
                      <img src={f.img} alt={f.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-semibold text-gray-900">{f.name}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {typeof f.restaurant === "object" ? f.restaurant?.name : "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{f.category}</td>
                    <td className="px-5 py-3 font-bold text-[#FF6B35]">${f.price.toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setEditing(f);
                            setShowForm(true);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(f._id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {foods.length === 0 && (
              <p className="px-5 py-10 text-center text-gray-500">No food items yet.</p>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <FoodFormModal
          initial={editing}
          restaurants={restaurants}
          onClose={() => setShowForm(false)}
          onSaved={(saved) => {
            setFoods((prev) =>
              editing ? prev.map((f) => (f._id === saved._id ? saved : f)) : [saved, ...prev]
            );
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

interface FoodFormModalProps {
  initial: FoodItem | null;
  restaurants: Restaurant[];
  onClose: () => void;
  onSaved: (f: FoodItem) => void;
}

const FoodFormModal = ({ initial, restaurants, onClose, onSaved }: FoodFormModalProps) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [category, setCategory] = useState(initial?.category ?? "");
  const [img, setImg] = useState(initial?.img ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [restaurantId, setRestaurantId] = useState(
    typeof initial?.restaurant === "object" ? initial.restaurant._id : restaurants[0]?._id ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setSaving(true);
    setError("");

    const payload = { name, price, category, img, description, restaurant: restaurantId };

    try {
      const { data } = initial
        ? await api.put(`/food-items/${initial._id}`, payload)
        : await api.post("/food-items", payload);

      onSaved(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save food item."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {initial ? "Edit Food Item" : "Add Food Item"}
          </h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />

          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          >
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
            />
          </div>

          <input
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35]"
          />

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={saving || !restaurantId}
            className="w-full rounded-2xl bg-[#FF6B35] py-3.5 font-bold text-white hover:bg-[#e95f28] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Food Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Users
// ============================================================

const UsersTab = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/users")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.error("Failed to load users", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading users...</p>;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-5 py-4 font-semibold text-gray-900">{u.name}</td>
                <td className="px-5 py-4 text-gray-600">{u.email}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                      u.isAdmin ? "bg-[#1A1A2E] text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.isAdmin ? "Admin" : "Customer"}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
