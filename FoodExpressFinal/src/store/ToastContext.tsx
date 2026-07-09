import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "info";
}

interface ToastContextValue {
  showToast: (message: string, type?: "success" | "info") => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-5 left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="flex items-center gap-2 rounded-full bg-[#1A1A2E] px-5 py-3 text-sm font-medium text-white shadow-xl"
            >
              {t.type === "success" ? (
                <CheckCircle2 size={16} className="text-[#2E8B3D]" />
              ) : (
                <Info size={16} className="text-[#F5821F]" />
              )}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
