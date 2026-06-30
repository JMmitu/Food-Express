import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowRight, ChevronRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog & News", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Safety Info", href: "#" },
    { label: "Accessibility", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  "For Business": [
    { label: "Partner With Us", href: "#" },
    { label: "Restaurant Portal", href: "#" },
    { label: "Advertise", href: "#" },
    { label: "Ride With Us", href: "#" },
    { label: "Corporate Orders", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: <Facebook size={18} />, label: "Facebook", href: "#", color: "hover:bg-[#1877F2]" },
  { icon: <Instagram size={18} />, label: "Instagram", href: "#", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500" },
  { icon: <Twitter size={18} />, label: "Twitter", href: "#", color: "hover:bg-[#1DA1F2]" },
  { icon: <Youtube size={18} />, label: "YouTube", href: "#", color: "hover:bg-[#FF0000]" },
];

const paymentMethods = ["💳 Visa", "💳 Mastercard", "📱 bKash", "📱 Nagad", "🏦 Bank Transfer", "💰 Cash on Delivery"];

export function Footer() {
  return (
    <footer className="bg-[#0d1117] text-white">
      {/* Newsletter bar */}
      <div className="bg-[#FF6B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-lg">Get exclusive deals straight to your inbox</p>
              <p className="text-orange-100 text-sm">Subscribe for weekly offers, new restaurant alerts &amp; more.</p>
            </div>
            <div className="flex w-full sm:w-auto gap-0 bg-white rounded-2xl overflow-hidden shadow-lg min-w-[320px]">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none"
              />
              <button className="bg-[#111827] hover:bg-[#1f2937] transition text-white font-bold px-5 py-3 flex items-center gap-1.5 whitespace-nowrap">
                Subscribe <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-0.5 mb-4">
              <span className="text-[#FF6B35] font-black text-2xl">Food</span>
              <span className="text-white font-black text-2xl">Express</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your favourite food, delivered fast. Connecting thousands of customers with the best local restaurants every day.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              <a href="#" className="flex items-start gap-3 text-gray-400 hover:text-[#FF6B35] transition text-sm group">
                <MapPin size={15} className="text-[#FF6B35] shrink-0 mt-0.5" />
                <span>FoodExpress, Bangladesh</span>
              </a>
              <a href="tel:+8801700000000" className="flex items-center gap-3 text-gray-400 hover:text-[#FF6B35] transition text-sm">
                <Phone size={15} className="text-[#FF6B35]" />
                +880 1880677473
              </a>
              <a href="mailto:hello@foodexpress.com" className="flex items-center gap-3 text-gray-400 hover:text-[#FF6B35] transition text-sm">
                <Mail size={15} className="text-[#FF6B35]" />
                hello@foodexpress.com
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 bg-white/10 ${s.color} transition-all rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:scale-110`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-white font-bold text-sm mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#FF6B35] rounded-full inline-block" />
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-[#FF6B35] transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#FF6B35]" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App download strip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm mb-0.5">Download the FoodExpress App</p>
            <p className="text-gray-400 text-xs">Get exclusive app-only deals and live order tracking</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition border border-white/10 rounded-xl px-4 py-2.5">
              <span className="text-xl">🍎</span>
              <span>
                <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
                <p className="text-sm font-bold text-white">App Store</p>
              </span>
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition border border-white/10 rounded-xl px-4 py-2.5">
              <span className="text-xl">🤖</span>
              <span>
                <p className="text-[10px] text-gray-400 leading-none">Get it on</p>
                <p className="text-sm font-bold text-white">Google Play</p>
              </span>
            </button>
          </div>
        </div>

        {/* Payment methods */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-gray-500 text-xs font-semibold mr-2">We Accept:</span>
          {paymentMethods.map((method) => (
            <span key={method} className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium">
              {method}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-[#FF6B35] font-semibold">FoodExpress</span>. All rights reserved. Made with ❤️ in Bangladesh.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition">Terms</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition">Cookies</a>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
