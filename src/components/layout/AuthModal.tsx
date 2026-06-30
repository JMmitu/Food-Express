import { useState } from "react";
import { X, User, Mail, Lock } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[420px] rounded-[30px] bg-white p-6 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <h2 className="text-3xl font-extrabold">
          <span className="text-[#FF6B35]">Food</span>
          <span className="text-[#1A1A2E]"> Express</span>
        </h2>

        <p className="mt-2 text-gray-500">
          {isLogin
            ? "Welcome back! Sign in to continue."
            : "Create your free account."}
        </p>

        {/* Tabs */}
        <div className="mt-6 flex rounded-2xl bg-gray-100 p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-xl py-3 font-semibold transition ${
              isLogin
                ? "bg-white text-[#1A1A2E] shadow"
                : "text-gray-500"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-xl py-3 font-semibold transition ${
              !isLogin
                ? "bg-white text-[#1A1A2E] shadow"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
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
              className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 outline-none focus:border-[#FF6B35]"
            />
          </div>

        </div>

        {/* Main Button */}
        <button className="mt-6 w-full rounded-2xl bg-[#FF6B35] py-4 text-lg font-bold text-white hover:bg-[#e95f28] transition">
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        <p className="mt-5 text-center text-gray-500">
          {isLogin ? (
            <>
              Don't have an account?
              <button
                onClick={() => setIsLogin(false)}
                className="ml-1 font-semibold text-[#FF6B35]"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button
                onClick={() => setIsLogin(true)}
                className="ml-1 font-semibold text-[#FF6B35]"
              >
                Sign In
              </button>
            </>
          )}
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-sm text-gray-400">
            or continue with
          </span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Social Buttons */}
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