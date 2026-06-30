import React from "react";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useCart } from "../../store/CartContext";

const TopBar: React.FC = () => {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="bg-[#1A1A2E] text-white">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-3">

        {/* Offer */}
        <div className="flex items-center gap-2 text-[12px] sm:text-[13px]">
          <span>🛍️</span>

          <span>
            Get 5% Off your first order, Promo:
            <span className="ml-1 font-semibold text-[#F5821F]">
              ORDER5
            </span>
          </span>
        </div>

        {/* Location */}
        <div className="hidden items-center gap-2 text-[13px] md:flex">
          <span>📍</span>

          <span>
           FoodExpress, Bangladesh
          </span>

          <a href="#" className="font-semibold text-[#F5821F]">
            Change location
          </a>
        </div>

        {/* Cart section */}
        <a
          href="/cart"
          aria-label={`View cart, ${totalItems} items, total GBP ${totalPrice.toFixed(2)}`}
          className="group flex items-center self-start overflow-hidden rounded-full bg-[#2E8B3D] transition-colors hover:bg-[#267433] sm:self-auto"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium sm:px-4 sm:py-2 sm:text-[13px]">
            <ShoppingCart size={15} aria-hidden="true" />
            <span>
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
          </div>

          <div className="border-x border-white/20 px-3 py-1.5 text-[12px] font-semibold sm:px-4 sm:py-2 sm:text-[13px]">
            GBP {totalPrice.toFixed(2)}
          </div>

          <span className="flex items-center px-3 py-1.5 transition-transform group-hover:translate-x-0.5 sm:px-4 sm:py-2">
            <ChevronRight size={15} aria-hidden="true" />
          </span>
        </a>

      </div>
    </div>
  );
};

export default TopBar;
