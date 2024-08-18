"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { FaArrowRight, FaCode, FaBrush, FaChartBar } from "react-icons/fa";

// Syntax highlight for unscraped data
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ScrapePage = () => {
  const searchParams = useSearchParams();
  const [scrapeData, setScrapeData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userUrl, setUserUrl] = useState("");

  const [currentPage, setCurrentPage] = useState("html"); //default state html

  const router = useRouter();

  // New input link
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const encodedUrl = encodeURIComponent(userUrl);
      router.push(`/scrape?url=${encodedUrl}`);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchScrapedData = async (url: string) => {
      try {
        // HTTP request
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        // Valid response, save scraped content
        const data = await response.json();
        setScrapeData(data.html);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Retrieve current page URL query
    const url = searchParams.get("url");

    if (url) {
      fetchScrapedData(decodeURIComponent(url));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center overflow-x-hidden min-h-screen justify-between">
      <div className="flex flex-col items-center w-screen">
        {/* Navbar */}
        <Navbar />
        {/* Appbar */}
        <div className="w-full max-w-6xl">
          <div className="flex justify-center gap-5">
            {/* Html */}
            <button
              onClick={() => setCurrentPage("html")}
              className="flex gap-1 text-center py-2 cursor-pointer text-gray-600 hover:text-black transition px-4"
            >
              <FaCode size={18} className="inline-block" />
              <div className="text-sm">HTML</div>
            </button>
            {/* Cleaned */}
            <button
              onClick={() => setCurrentPage("cleaned")}
              className="flex gap-1 text-center py-2 cursor-pointer text-gray-600 hover:text-black transition px-4"
            >
              <FaBrush size={18} className="inline-block" />
              <div className="text-sm">Cleaned</div>
            </button>
            {/* Analytics */}
            <button
              disabled
              onClick={() => setCurrentPage("analytics")}
              className="flex gap-1 text-center py-2 cursor-pointer text-gray-600 hover:text-black transition px-4 line-through"
            >
              <FaChartBar size={18} className="inline-block" />
              <div className="text-sm">Analytics</div>
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="flex flex-col items-center justify-center h-max w-full max-w-6xl">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
          </div>
        ) : scrapeData ? (
          <div className="w-full bg-white p-6 rounded-lg shadow-2xl overflow-y-auto h-[75vh] custom-scrollbar">
            {/* Syntax highlight */}
            <SyntaxHighlighter
              language="html"
              style={solarizedlight}
              className="custom-scrollbar"
            >
              {scrapeData}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              Welcome to Olostep Track
            </div>
            <div className="text-lg text-gray-700 mb-8">
              Enter a URL below to scrape its content. We’ll display the HTML
              and contents in a readable format.
            </div>
          </div>
        )}
      </div>

      {/* Url input */}
      <div className="flex justify-center w-full mb-5">
        <form
          className="relative w-full md:max-w-md md:px-0 px-4"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Enter URL"
            className="w-full py-4 pl-6 pr-16 bg-black text-white rounded-full shadow-lg focus:outline-none"
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
