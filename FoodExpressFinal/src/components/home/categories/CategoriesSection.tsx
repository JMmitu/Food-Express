import { useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "../../../services/api";
import { useSearch } from "../../../store/SearchContext";

interface Category {
  _id: string;
  name: string;
  emoji: string;
  img: string;
}

export function CategoriesSection()
{
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryFilter, setCategoryFilter, setQuery } = useSearch();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleSelect = (name: string) => {
    // A category filter is independent from any leftover free-text search.
    setQuery("");

    const next = categoryFilter === name ? null : name;
    setCategoryFilter(next);

    if (next) {
      document.getElementById("foods")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold">
          Loading Categories...
        </h2>
      </section>
    );
  }

  return (
    <section
  id="popular-categories"
  className="py-12 bg-background scroll-mt-28"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 font-bold text-2xl">Popular Categories</h2>
            <p className="text-gray-500 text-sm mt-1">What are you craving today?</p>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(cat.name)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                  categoryFilter === cat.name
                    ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/30 scale-110"
                    : "border-white shadow-md group-hover:border-[#FF6B35]/50 group-hover:scale-105"
                }`}
                style={{ borderWidth: 3 }}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  categoryFilter === cat.name ? "text-[#FF6B35]" : "text-gray-700 group-hover:text-[#FF6B35]"
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
