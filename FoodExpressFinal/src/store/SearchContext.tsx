import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface SearchContextValue {
  query: string;
  categoryFilter: string | null;
  setQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  clearFilters: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const clearFilters = useCallback(() => {
    setQuery("");
    setCategoryFilter(null);
  }, []);

  return (
    <SearchContext.Provider
      value={{ query, categoryFilter, setQuery, setCategoryFilter, clearFilters }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }

  return context;
}
