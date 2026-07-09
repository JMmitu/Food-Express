import { useState } from "react";
import { X, User, Mail, Lock } from "lucide-react";
import { useAuth } from "../../store/AuthContext";
import { getErrorMessage } from "../../utils/errorMessage";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Switching tabs should always start from a clean slate — otherwise a
  // stale error/password from a previous failed attempt sticks around and
  // makes it look like the new attempt silently failed.
  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setError("");
    setPassword("");
  };

  const handleSubmit = async () => {
    setError("");

    if (!isLogin && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        alert("Login Successful ✅");
      } else {
        await register(name, email, password);
        alert("Account Created Successfully ✅");
      }

      onClose();
    } catch (err) {
      setError(
        getErrorMessage(err, "Something went wrong.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[420px] rounded-[30px] bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-extrabold">
          <span className="text-[#FF6B35]">Food</span>
          <span className="text-[#1A1A2E]"> Express</span>
        </h2>

        <p className="mt-2 text-gray-500">
          {isLogin
            ? "Welcome back! Sign in to continue."
            : "Create your free account."}
        </p>

        <div className="mt-6 flex rounded-2xl bg-gray-100 p-1">
          <button
            onClick={() => switchMode(true)}
            className={`flex-1 rounded-xl py-3 font-semibold transition ${
              isLogin
                ? "bg-white text-[#1A1A2E] shadow"
                : "text-gray-500"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => switchMode(false)}
            className={`flex-1 rounded-xl py-3 font-semibold transition ${
              !isLogin
                ? "bg-white text-[#1A1A2E] shadow"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        <div className="mt-6 space-y-4">
                    {!isLogin && (
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
              />
            </div>
          )}

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-500">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#FF6B35] py-4 text-lg font-bold text-white transition hover:bg-[#e95f28] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Sign In"
            : "Create Account"}
        </button>

        <p className="mt-5 text-center text-gray-500">
          {isLogin ? (
            <>
              Don't have an account?
              <button
                onClick={() => switchMode(false)}
                className="ml-1 font-semibold text-[#FF6B35]"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button
                onClick={() => switchMode(true)}
                className="ml-1 font-semibold text-[#FF6B35]"
              >
                Sign In
              </button>
            </>
          )}
        </p>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-sm text-gray-400">
            or continue with
          </span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-gray-200 py-3 font-semibold hover:bg-gray-50">
            🌐 Google
          </button>

          <button className="rounded-xl border border-gray-200 py-3 font-semibold hover:bg-gray-50">
            📘 Facebook
          </button>
        </div>
              </div>
    </div>
  );
};

export default AuthModal;
