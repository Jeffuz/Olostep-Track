import Navbar from "./components/Navbar";
import Hero from "./components/Landing/Hero";
import Team from "./components/Landing/Team";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="flex justify-center">
        <div className="text-white bg-black w-[80%] aspect-video p-10 rounded-3xl">
          [Image of inputted url with output data page]
        </div>
      </div>
      <Team />
    </div>
  );
}
