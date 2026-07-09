import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, User, LogOut, ShoppingBag, LayoutDashboard, ChevronDown } from "lucide-react";
import AuthModal from "./AuthModal";
import { useAuth } from "../../store/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "hero", active: true },
  { label: "Offers", href: "offers" },
  { label: "Popular Items", href: "popular-categories" },
  { label: "Restaurants", href: "restaurants" },
  { label: "Download App", href: "app-promo" },
];

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Section anchors only exist on the homepage. If we're on another page,
  // navigate home first (with the hash) then let the browser scroll there.
  const handleScroll = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="relative z-[9999] bg-white">
        <div className="mx-auto max-w-[1520px]">
          <nav className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("hero");
              }}
              className="flex items-center text-[26px] font-extrabold tracking-tight sm:text-[34px]"
            >
              <span className="text-[#1A1A2E]">Food</span>
              <span className="ml-1 text-[#F5821F]">Express</span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden items-center gap-1 lg:flex lg:gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(link.href);
                    }}
                    className={
                      link.active && location.pathname === "/"
                        ? "rounded-full bg-[#F5821F] px-6 py-3 text-[15px] font-semibold text-white"
                        : "rounded-full px-5 py-3 text-[15px] font-medium text-gray-800 hover:text-[#F5821F] transition"
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Login / Account */}
            {user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={showUserMenu}
                  className="flex items-center gap-2 rounded-full bg-[#1A1A2E] px-6 py-3 text-[15px] font-medium text-white"
                >
                  <User size={16} />
                  {user.name.split(" ")[0]}
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showUserMenu && (
                 <div className="absolute right-0 top-full z-[99999] mt-2 w-52 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                    <p className="truncate px-3 py-2 text-xs text-gray-400">
                      {user.email}
                    </p>

                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <ShoppingBag size={16} />
                      My Profile &amp; Orders
                    </Link>

                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard size={16} />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="hidden items-center gap-2 rounded-full bg-[#1A1A2E] px-6 py-3 text-[15px] font-medium text-white lg:flex"
              >
                <User size={16} />
                Login/Signup
              </button>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-full p-2 text-[#1A1A2E] lg:hidden"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="border-t border-gray-100 px-4 pb-5 lg:hidden">
              <ul className="flex flex-col gap-2 pt-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.href}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(link.href);
                      }}
                      className="block rounded-full px-5 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {user ? (
                <div className="mt-3 space-y-2">
                  <p className="px-5 text-sm text-gray-500">
                    Signed in as <span className="font-semibold text-gray-800">{user.name}</span>
                  </p>

                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-[15px] font-medium text-gray-700"
                  >
                    <ShoppingBag size={16} />
                    My Profile &amp; Orders
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-[15px] font-medium text-gray-700"
                    >
                      <LayoutDashboard size={16} />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-6 py-3 text-[15px] font-medium text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsOpen(false);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-6 py-3 text-[15px] font-medium text-white"
                >
                  <User size={16} />
                  Login/Signup
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
};

export default Navbar;
