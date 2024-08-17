"use client";
import { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={"bg-white w-full block m-2"}>
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-4xl font-medium font-serif">
              {/* <Image
                src=""
                alt="Logo"
                width={72}
                height={36}
                className="w-auto h-9 sm:h-11"
              /> */}
                olostep track
            </Link>

            {/* Menu for mobile view */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {/* {!isOpen ? (
                  // Hamburger Button
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                    
                //   Close Button
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )} */}
                <Link href="https://github.com/Jeffuz/Olostep-Track" target="blank_">
                  <FaGithub size={30} className="text-black1 hover:text-black1/70 transition duration-500"/>
                </Link>
              </button>
            </div>
          </div>

          {/* Navbar elements */}
          <div
            // className={`${
            //   isOpen
            //     ? "translate-x-0 opacity-100" // mobile
            //     : "opacity-0 -translate-x-full gap-5" // default
            // } bg-teal3 absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <button className="items-center mt-4 lg:mt-0 text-black1 transition duration-300 border-b-2 border-b-transparent hover:border-b-2 hover:border-b-black1 px-2 hidden lg:flex">
              <Link href="https://github.com/Jeffuz/Olostep-Track">
                Github Repo
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
