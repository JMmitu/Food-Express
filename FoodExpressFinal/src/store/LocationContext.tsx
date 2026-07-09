import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export const CITIES = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Cox's Bazar",
  "Comilla",
];

interface LocationContextValue {
  city: string;
  setCity: (city: string) => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

const STORAGE_KEY = "foodexpress_city";

function readStoredCity(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || "Dhaka";
  } catch {
    return "Dhaka";
  }
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string>(() => readStoredCity());

  const setCity = useCallback((next: string) => {
    setCityState(next);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — fall back to in-memory state only
    }
  }, []);

  return (
    <LocationContext.Provider value={{ city, setCity }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocationContext must be used inside LocationProvider");
  }

  return context;
}
