import { motion } from "motion/react";

const stats = [
  { value: "546+", label: "Registered Users", icon: "👥" },
  { value: "768,900+", label: "Products Available", icon: "🍽️" },
  { value: "690+", label: "Restaurants Listed", icon: "🏪" },
  { value: "17,467+", label: "Happy Customers", icon: "😊" },
];

export function StatsSection() {
  return (
    <section className="py-14 bg-[#2F4858] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase mb-2">By The Numbers</p>
          <h2 className="text-white font-bold text-2xl">Know more about us</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <p className="text-[#FF6B35] font-black text-2xl sm:text-3xl mb-1">{stat.value}</p>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
