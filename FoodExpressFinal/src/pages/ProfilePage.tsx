import { useEffect, useState } from "react";
import { User, Mail, Lock, Package, LogOut, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../store/AuthContext";
import { getErrorMessage } from "../utils/errorMessage";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  paymentMethod: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-blue-50 text-blue-600",
  preparing: "bg-purple-50 text-purple-600",
  "out-for-delivery": "bg-orange-50 text-orange-600",
  delivered: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-600",
};

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"account" | "orders">("account");

  // Account form
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setOrdersLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileMsg("");
    setProfileErr("");

    try {
      const { data } = await api.put("/auth/me", { name, email });
      updateUser(data.user);
      setProfileMsg("Profile updated successfully.");
    } catch (err) {
      setProfileErr(getErrorMessage(err, "Failed to update profile."));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setSavingPassword(true);
    setPasswordMsg("");
    setPasswordErr("");

    try {
      await api.put("/auth/me/password", { currentPassword, newPassword });
      setPasswordMsg("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordErr(getErrorMessage(err, "Failed to update password."));
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <section className="min-h-[70vh] bg-[#F9FAFB] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1A2E] text-2xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 inline-flex rounded-2xl bg-gray-100 p-1">
          <button
            onClick={() => setTab("account")}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
              tab === "account" ? "bg-white text-[#1A1A2E] shadow" : "text-gray-500"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
              tab === "orders" ? "bg-white text-[#1A1A2E] shadow" : "text-gray-500"
            }`}
          >
            My Orders
          </button>
        </div>

        {tab === "account" ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Profile Info */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Profile Information</h2>

              <div className="space-y-4">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
                  />
                </div>

                {profileMsg && <p className="text-sm font-medium text-[#2E8B3D]">{profileMsg}</p>}
                {profileErr && <p className="text-sm font-medium text-red-500">{profileErr}</p>}

                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="w-full rounded-2xl bg-[#FF6B35] py-3.5 font-bold text-white transition hover:bg-[#e95f28] disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Change Password */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Change Password</h2>

              <div className="space-y-4">
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
                  />
                </div>

                {passwordMsg && <p className="text-sm font-medium text-[#2E8B3D]">{passwordMsg}</p>}
                {passwordErr && <p className="text-sm font-medium text-red-500">{passwordErr}</p>}

                <button
                  onClick={handleChangePassword}
                  disabled={savingPassword}
                  className="w-full rounded-2xl bg-[#1A1A2E] py-3.5 font-bold text-white transition hover:bg-[#111122] disabled:opacity-60"
                >
                  {savingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-fit items-center gap-2 rounded-2xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50 lg:col-span-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {ordersLoading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-sm">
                <Package size={28} className="mb-3 text-gray-300" />
                <p className="font-semibold text-gray-900">No orders yet</p>
                <p className="text-sm text-gray-500">Your order history will show up here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-mono text-sm font-semibold text-gray-500">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-bold capitalize ${
                        STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status.replace(/-/g, " ")}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-600">
                        <span>
                          {item.quantity}× {item.name}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-sm text-gray-500">{order.deliveryAddress}</span>
                    <span className="font-bold text-[#FF6B35]">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
