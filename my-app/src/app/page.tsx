import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Landing/Hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Navbar/>
      <Hero />
    </div>
  );
}
