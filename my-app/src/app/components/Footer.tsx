import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between p-5 items-center border-t-2">
      <Link href={"/"}>
        <div className="text-2xl font-medium font-serif">olostep track</div>
      </Link>
      <div className="text-md text-gray-500">
        © 2024 Olostep Track. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
