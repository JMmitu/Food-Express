import React from "react";
import HeroContent from "./HeroContent";
import HeroImages from "./HeroImages";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#F7F7F7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[24px] bg-[#F3F3F3]">

        <div className="grid grid-cols-1 lg:min-h-[560px] lg:grid-cols-2">

          {/* Left Side */}
          <div className="flex items-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-0">
            <HeroContent />
          </div>

          {/* Right Side */}
          <div className="relative h-[320px] overflow-hidden sm:h-[420px] lg:h-auto">

            <div
              className="
              absolute
              right-0
              top-0
              h-full
              w-[74%]
              rounded-tl-[140px]
              bg-[#FC8A06]
              sm:rounded-tl-[200px]
              lg:rounded-tl-[280px]
              "
            />

            <HeroImages />

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
