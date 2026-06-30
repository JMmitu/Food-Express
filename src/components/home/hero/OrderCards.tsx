import React from "react";

interface OrderCardProps {
  title: string;
  message: string;
  className: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  message,
  className,
}) => {
  return (
    <div
      className={`
      absolute
      w-[150px]
      rounded-[12px]
      bg-white
      px-2.5
      py-2
      shadow-[0_8px_20px_rgba(0,0,0,0.12)]
      sm:w-[190px]
      sm:rounded-[16px]
      sm:px-3.5
      sm:py-2.5
      lg:w-[240px]
      lg:rounded-[18px]
      lg:px-4
      lg:py-3
      ${className}
    `}
    >
      <div className="mb-1 flex items-center justify-between sm:mb-1.5 lg:mb-2">

        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-[#03081F] sm:text-[13px] lg:text-base">
            Food
          </span>

          <span className="rounded bg-[#FC8A06] px-1 py-[1px] text-[7px] font-semibold text-white sm:px-1.5 sm:py-[2px] sm:text-[9px]">
            Express
          </span>
        </div>

        <span className="text-[9px] text-gray-400 sm:text-[11px]">
          now
        </span>

      </div>

      <h4 className="text-[10px] font-semibold leading-snug text-[#03081F] sm:text-[12px] lg:text-[14px]">
        {title}
      </h4>

      <p className="mt-0.5 hidden text-[10px] leading-relaxed text-gray-500 sm:mt-1 sm:block sm:text-[11px] lg:text-[12px]">
        {message}
      </p>
    </div>
  );
};

const OrderCards: React.FC = () => {
  return (
    <>
      {/* Card 1 */}
      <OrderCard
        className="
        right-[8px]
        top-[8px]
        z-40
        sm:right-[24px]
        sm:top-[16px]
        lg:right-[40px]
        lg:top-[20px]
        "
        title="We've received your order!"
        message="Awaiting Restaurant acceptance."
      />

      {/* Card 2 */}
      <OrderCard
        className="
        right-[4px]
        top-[78px]
        z-50
        sm:right-[12px]
        sm:top-[100px]
        lg:right-[20px]
        lg:top-[145px]
        "
        title="Order Accepted! ✅"
        message="Your order will be delivered shortly."
      />

      {/* Card 3 */}
      <OrderCard
        className="
        hidden
        sm:right-[24px]
        sm:top-[190px]
        sm:block
        lg:right-[40px]
        lg:top-[270px]
        z-40
        "
        title="Your rider's nearby! 🛵"
        message="They're almost there — get ready!"
      />
    </>
  );
};

export default OrderCards;
