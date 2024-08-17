import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center flex-1 text-center w-full max-w-6xl px-4 md:px-6 lg:px-8 text-[#333333] gap-5 tracking-wider">
        {/* Title */}
        <div className="text-5xl font-[3.75rem] text-foreground md:text-6xl lg:text-7xl">
          Extract and Unlock the Web&apos;s Hidden Secrets with a Click
        </div>
        {/* Subtitle */}
        <div className="text-md max-w-3xl md:text-lg lg:text-xl">
          <span className="font-bold">
            Instantly transform any URL into actionable data.
          </span>{" "}
          Input a link, and our{" "}
          <span className="font-bold">
            streamlined platform scrapes, stores, and displays
          </span>{" "}
          the information in <span className="font-bold">real-time</span>.
          Deployed with ease, ensuring{" "}
          <span className="font-bold">accuracy and efficiency</span> at every
          step
        </div>
        {/* CTA */}
        <Link href={"/scrape"}>
          <button className="bg-black1 hover:bg-black1/80 transition duration-300 text-white py-4 px-8 rounded-md shadow-md font-medium">
            Click to Start Scraping
          </button>
        </Link>
        {/* Fine Print */}
        <div className="text-sm  max-w-md text-black1/70">
          Get precise data from any webpage in seconds. Start now and experience
          seamless data extraction with just one click.
        </div>
      </div>
    </div>
  );
};

export default Hero;
