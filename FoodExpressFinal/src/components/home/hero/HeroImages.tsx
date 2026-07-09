import React from "react";
import OrderCards from "./OrderCards";

import girlImage from "../../../assets/images/pizza.png";
import noodlesImage from "../../../assets/images/noodels.png";

const HeroImages: React.FC = () => {
  return (
    <div className="relative h-full w-full">

      {/* Main Girl */}
      <img
        src={girlImage}
        alt="Hero"
        className="
          absolute
          bottom-[-10px]
          left-[-90px]
          z-20
          h-[360px]
          w-auto
          origin-bottom-left
          object-contain
          sm:bottom-[-30px]
          sm:left-[-140px]
          sm:h-[360px]
          lg:bottom-[-100px]
          lg:left-[-180px]
          lg:h-[480px]
          lg:scale-[1.3]
          xl:left-[-280px]
          xl:h-[520px]
          xl:scale-[1.5]
        "
      />

      {/* Noodles */}
      <img
        src={noodlesImage}
        alt="Noodles"
        className="
          absolute
          right-[16px]
          top-[40px]
          z-10
          hidden
          h-[100px]
          w-[100px]
          rounded-[14px]
          object-cover
          shadow-xl
          sm:block
          sm:right-[24px]
          sm:top-[60px]
          sm:h-[130px]
          sm:w-[130px]
          lg:right-[140px]
          lg:top-[110px]
          lg:h-[150px]
          lg:w-[150px]
          lg:scale-[1.2]
          xl:right-[200px]
          xl:top-[130px]
          xl:h-[170px]
          xl:w-[170px]
          xl:scale-[1.4]
        "
      />

      <OrderCards />

    </div>
  );
};

export default HeroImages;
