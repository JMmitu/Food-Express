import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../../../store/SearchContext";

const HeroContent: React.FC = () => {
  const [postcode, setPostcode] = useState("");
  const { setQuery, setCategoryFilter } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const runSearch = () => {
    const trimmed = postcode.trim();

    // A fresh search always starts from a clean slate (no stale category filter).
    setCategoryFilter(null);
    setQuery(trimmed);

    const scrollToResults = () => {
      document.getElementById("foods")?.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      // Wait a tick for the homepage to mount before scrolling.
      setTimeout(scrollToResults, 100);
    } else {
      scrollToResults();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  };

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
          placeholder="e.g. EC4R 3TE, or search a dish/restaurant"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent px-3 text-xs outline-none sm:px-4 sm:text-sm"
        />

        <button
          type="button"
          onClick={runSearch}
          className="
          shrink-0
          rounded-full
          bg-[#FC8A06]
          px-5
          py-2.5
          text-xs
          font-semibold
          text-white
          transition
          hover:bg-[#e87d00]
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
