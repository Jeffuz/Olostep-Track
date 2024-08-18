import Navbar from "./components/Navbar";
import Hero from "./components/Landing/Hero";
import Team from "./components/Landing/Team";
import Image from "next/image";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="flex justify-center">
        <div className="relative w-[80%] aspect-video p-10 bg-black rounded-3xl shadow-2xl">
          <Image
            src="/olostep_track.png"
            alt="Image of inputted url with output data page"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
      </div>
      <Team />
      <Footer/>
    </div>
  );
}
