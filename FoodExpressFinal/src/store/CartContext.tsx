import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  img: string;
  quantity: number;
}

interface BackendCartItem {
  foodItem: string;
  name: string;
  restaurant: string;
  price: number;
  img: string;
  quantity: number;
}

interface BackendCart {
  items: BackendCartItem[];
}

function fromBackend(cart: BackendCart): CartItem[] {
  return cart.items.map((i) => ({
    id: i.foodItem,
    name: i.name,
    restaurant: i.restaurant,
    price: i.price,
    img: i.img,
    quantity: i.quantity,
  }));
}

interface CartContextValue {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">) => void;

  removeItem: (id: string) => void;

  updateQty: (id: string, delta: number) => void;

  clearCart: () => void;

  totalItems: number;

  totalPrice: number;

  isOpen: boolean;

  openCart: () => void;

  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Tracks whether the local (pre-login) cart has already been merged
  // into the backend cart for the current session, so we don't re-merge on every render.
  const hasMergedRef = useRef(false);

  // When the user logs in, push whatever was in the local/guest cart to the
  // backend, then load the authoritative cart from the server.
  useEffect(() => {
    if (!token) {
      hasMergedRef.current = false;
      return;
    }

    if (hasMergedRef.current) return;
    hasMergedRef.current = true;

    async function syncOnLogin() {
      try {
        const guestItems = items;

        for (const item of guestItems) {
          await api.post("/cart", {
            foodItemId: item.id,
            quantity: item.quantity,
          });
        }

        const { data } = await api.get("/cart");
        setItems(fromBackend(data));
      } catch (err) {
        console.error("Failed to sync cart after login", err);
      }
    }

    syncOnLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);

        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          );
        }

        return [
          ...prev,
          {
            ...item,
            quantity: 1,
          },
        ];
      });

      setIsOpen(true);

      if (token) {
        api
          .post("/cart", { foodItemId: item.id, quantity: 1 })
          .catch((err) => console.error("Failed to add item to cart", err));
      }
    },
    [token]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((i) => i.id !== id));

      if (token) {
        api
          .delete(`/cart/${id}`)
          .catch((err) => console.error("Failed to remove item from cart", err));
      }
    },
    [token]
  );

  const updateQty = useCallback(
    (id: string, delta: number) => {
      setItems((prev) => {
        const next = prev
          .map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity + delta,
                }
              : i
          )
          .filter((i) => i.quantity > 0);

        if (token) {
          const updated = next.find((i) => i.id === id);

          if (updated) {
            api
              .put(`/cart/${id}`, { quantity: updated.quantity })
              .catch((err) => console.error("Failed to update cart item", err));
          } else {
            api
              .delete(`/cart/${id}`)
              .catch((err) => console.error("Failed to remove cart item", err));
          }
        }

        return next;
      });
    },
    [token]
  );

  const clearCart = useCallback(() => {
    setItems([]);

    if (token) {
      api.delete("/cart").catch((err) => console.error("Failed to clear cart", err));
    }
  }, [token]);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
