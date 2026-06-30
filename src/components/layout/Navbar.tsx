import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import AuthModal from "./AuthModal";

const NAV_LINKS = [
  { label: "Home", href: "#hero", active: true },
  { label: "Offers", href: "#offers" },
  { label: "Popular Items", href: "#popular-categories" },
  { label: "Restaurants", href: "#restaurants" },
  { label: "Download App", href: "#app-promo" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleScroll = (href: string) => {
    const id = href.replace("#", "");

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="mx-auto max-w-[1520px]">
          <nav className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("#hero");
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
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(link.href);
                    }}
                    className={
                      link.active
                        ? "rounded-full bg-[#F5821F] px-6 py-3 text-[15px] font-semibold text-white"
                        : "rounded-full px-5 py-3 text-[15px] font-medium text-gray-800 hover:text-[#F5821F] transition"
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Login */}
            <button
              onClick={() => setShowAuth(true)}
              className="hidden items-center gap-2 rounded-full bg-[#1A1A2E] px-6 py-3 text-[15px] font-medium text-white lg:flex"
            >
              <User size={16} />
              Login/Signup
            </button>

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
                      href={link.href}
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