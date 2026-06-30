import React, { useState } from "react";

const HeroContent: React.FC = () => {
  const [postcode, setPostcode] = useState("");

  return (
    <div className="w-full max-w-[520px]">

      <p className="mb-3 text-xs text-gray-500 sm:mb-4 sm:text-sm">
        Order Restaurant food, takeaway and groceries.
      </p>

      <h1 className="mb-5 text-[34px] font-extrabold leading-[1.1] text-[#03081F] sm:mb-6 sm:text-[46px] lg:mb-8 lg:text-[68px] lg:leading-[1.05]">
        Feast Your
        <br />
        Senses,
        <br />
        <span className="text-[#FC8A06]">
          Fast and Fresh
        </span>
      </h1>

      <p className="mb-3 text-xs text-gray-500 sm:mb-4 sm:text-sm">
        Enter a postcode to see what we deliver
      </p>

      <div className="flex w-full max-w-[470px] items-center rounded-full bg-white p-1.5 shadow-md sm:p-2">

        <input
          type="text"
          placeholder="e.g. EC4R 3TE"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 text-xs outline-none sm:px-4 sm:text-sm"
        />

        <button
          className="
          shrink-0
          rounded-full
          bg-[#FC8A06]
          px-5
          py-2.5
          text-xs
          font-semibold
          text-white
          sm:px-10
          sm:py-3
          sm:text-sm
          "
        >
          Search
        </button>

      </div>

    </div>
  );
};

export default HeroContent;
