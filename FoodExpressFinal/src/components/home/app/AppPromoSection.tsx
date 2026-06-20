import { motion } from "motion/react";

export function AppPromoSection() {
  return (
    <section
  id="app-promo"
  className="py-16 bg-[#111827] text-white overflow-hidden relative"
>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2F4858]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — phone mockup area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="w-52 h-96 bg-gradient-to-b from-gray-700 to-gray-900 rounded-[3rem] border-4 border-gray-600 shadow-2xl overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Phone screen content */}
                  <div className="bg-[#FF6B35] px-4 py-6 text-white">
                    <p className="text-xs opacity-70 mb-1">FoodExpress</p>
                    <p className="font-bold text-sm">Order placed! 🎉</p>
                  </div>
                  <div className="flex-1 bg-white p-4 space-y-3">
                    {[
                      { label: "Smash Burger x2", price: "$25.98" },
                      { label: "Delivery fee", price: "$0.00" },
                      { label: "Total", price: "$25.98" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-xs text-gray-700">
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    ))}
                    <div className="bg-[#FF6B35]/10 rounded-xl p-3 text-center">
                      <p className="text-[#FF6B35] font-bold text-xs">🚴 On the way — 18 min</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -right-8 top-12 bg-white rounded-2xl shadow-xl px-3 py-2.5 text-xs"
              >
                <p className="text-gray-800 font-bold">⚡ Live Tracking</p>
                <p className="text-gray-400">Updated every 30s</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -left-10 bottom-16 bg-[#FF6B35] rounded-2xl shadow-xl px-3 py-2.5 text-xs text-white"
              >
                <p className="font-bold">4.9 ★ Rated App</p>
                <p className="opacity-80">50k+ reviews</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-[#FF6B35] text-xs font-bold tracking-widest uppercase mb-4">
              Mobile App
            </span>
            <h2 className="text-white font-black text-3xl sm:text-4xl leading-tight mb-4">
              Ordering is more{" "}
              <span className="text-[#FF6B35]">Personalized</span>{" "}
              &amp; Instant
            </h2>
            <p className="text-gray-400 text-base mb-6 max-w-md">
              Download the FoodExpress app for the best experience — live order tracking, exclusive deals, and one-tap reorders from your favourite spots.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Real-time GPS order tracking",
                "Exclusive app-only offers & coupons",
                "Save multiple delivery addresses",
                "Instant push notifications",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-5 h-5 bg-[#FF6B35]/20 rounded-full flex items-center justify-center text-[#FF6B35] text-xs shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-3 bg-white hover:bg-gray-100 transition text-gray-900 font-semibold px-5 py-3 rounded-2xl shadow">
                <span className="text-xl">🍎</span>
                <span>
                  <p className="text-[10px] text-gray-500 leading-none mb-0.5">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </span>
              </button>
              <button className="flex items-center gap-3 bg-white hover:bg-gray-100 transition text-gray-900 font-semibold px-5 py-3 rounded-2xl shadow">
                <span className="text-xl">🤖</span>
                <span>
                  <p className="text-[10px] text-gray-500 leading-none mb-0.5">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
