"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa";

const ScrapePage = () => {
  const searchParams = useSearchParams();
  const [scrapeData, setScrapeData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userUrl, setUserUrl] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedUrl = encodeURIComponent(userUrl);
    router.push(`/scrape?url=${encodedUrl}`);
  };
  useEffect(() => {
    const fetchScrapedData = async (url: string) => {
      try {
        // http request
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        // valid response, save scraped content
        const data = await response.json();
        setScrapeData(data.html);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    // retrieve current page url query
    const url = searchParams.get("url");

    if (url) {
      fetchScrapedData(decodeURIComponent(url));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      {/* Page content */}
      <div>
        {/* Sidebar */}
        <div></div>
        {/* Display Content */}
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : scrapeData ? (
            <div>{scrapeData}</div>
          ) : (
            <div>No content available.</div>
          )}
        </div>
      </div>
      {/* Url input */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
        <form
          className="relative w-full md:max-w-md md:px-0 px-4"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Enter URL"
            className="w-full py-4 pl-6 pr-16 bg-black1 text-white rounded-full shadow-lg focus:outline-none"
            value={userUrl}
            onChange={(e) => setUserUrl(e.target.value)}
          />
          <button
            type="submit"
            className="md:mx-0 mx-4 absolute right-1 top-1 bottom-1 w-12 text-white bg-transparent hover:bg-gray-800 h-12 transition duration-300 rounded-full flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScrapePage;
