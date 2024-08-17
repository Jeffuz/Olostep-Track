"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        router.push("/scrape");
      } else {
        console.error("API call failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center flex-1 text-center w-full max-w-6xl px-4 md:px-6 lg:px-8 text-[#333333] gap-5 tracking-wider">
        {/* Title */}
        <div className="text-5xl font-[3.75rem] text-foreground md:text-6xl lg:text-7xl">
          Extract and Unlock the Web&apos;s Hidden Secrets with a Click
        </div>
        {/* Subtitle */}
        <div className="text-base max-w-3xl md:text-md lg:text-lg">
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
          step.
        </div>
        {/* Text field for url */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <input
            type="url"
            placeholder="Enter URL to scrape"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className={`mt-4 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black1 hover:bg-black1/80"
            } transition duration-300 text-white py-4 px-8 rounded-md shadow-md font-medium w-full`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Start Scraping"}
          </button>
        </form>
        {/* Fine Print */}
        <div className="md:text-sm text-xs max-w-md text-black1/70 mt-4">
          Get precise data from any webpage in seconds. Start now and experience
          seamless data extraction with just one link.
        </div>
      </div>
    </div>
  );
};

export default Hero;
