"use client";

import React, { Suspense, useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState("html"); // default state html

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
        const response = await fetch("http://localhost:5000/scrape", {
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

  // Render content depending on pages
  const renderContent = () => {
    // Loading state
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
        </div>
      );
    }

    // No query for /scrape
    if (!scrapeData) {
      return (
        <div className="text-center">
          <div className="text-3xl font-bold mb-4">
            Welcome to Olostep Track
          </div>
          <div className="text-lg text-gray-700 mb-8">
            Enter a URL below to scrape its content. We’ll display the HTML and
            contents in a readable format.
          </div>
        </div>
      );
    }

    // Html page
    if (currentPage === "html") {
      return (
        <div className="w-full bg-white p-6 rounded-lg shadow-2xl overflow-y-auto h-[75vh] custom-scrollbar">
          <SyntaxHighlighter
            language="html"
            style={solarizedlight}
            className="custom-scrollbar"
          >
            {scrapeData}
          </SyntaxHighlighter>
        </div>
      );
    }

    // Clean Page
    if (currentPage === "cleaned") {
      return (
        <div className="w-full bg-white p-6 rounded-lg shadow-2xl overflow-y-auto h-[75vh] custom-scrollbar">
          <div>Clean</div>
        </div>
      );
    }

    // Analytics Page
    if (currentPage === "analytics") {
      return (
        <div className="w-full bg-white p-6 rounded-lg shadow-2xl overflow-y-auto h-[75vh] custom-scrollbar">
          <div>Analytic</div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center overflow-x-hidden min-h-screen justify-between">
      <div className="flex flex-col items-center w-screen">
        {/* Navbar */}
        <Navbar />
        {/* Appbar */}
        <div className="w-full max-w-6xl">
          <div className="flex justify-center gap-5">
            {/* HTML */}
            <button
              onClick={() => setCurrentPage("html")}
              className={`flex gap-1 text-center py-2 cursor-pointer transition px-4 ${
                currentPage === "html"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <FaCode size={18} className="inline-block" />
              <div className="text-sm">HTML</div>
            </button>
            {/* Cleaned */}
            <button
              onClick={() => setCurrentPage("cleaned")}
              className={`flex gap-1 text-center py-2 cursor-pointer transition px-4 ${
                currentPage === "cleaned"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <FaBrush size={18} className="inline-block" />
              <div className="text-sm">Cleaned</div>
            </button>
            {/* Analytics */}
            <button
              onClick={() => setCurrentPage("analytics")}
              className={`flex gap-1 text-center py-2 cursor-pointer transition px-4 ${
                currentPage === "analytics"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <FaChartBar size={18} className="inline-block" />
              <div className="text-sm">Analytics</div>
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="flex flex-col items-center justify-center h-max w-full max-w-6xl">
        {renderContent()}
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

export default function ScrapePageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <ScrapePage />
    </Suspense>
  );
}
