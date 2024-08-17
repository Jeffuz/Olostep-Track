import React from "react";
import Image from "next/image";

// Individual card
const TeamCard = ({ name, role, image }: any) => {
  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto">
        <Image
          className="rounded-full"
          src={image}
          alt={name}
          width={96}
          height={96}
        />
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-800">{name}</div>
      <div className="text-sm text-gray-600">{role}</div>
    </div>
  );
};

const TeamCards = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Title + description */}
      <div className="flex flex-col items-center">
        <div className="text-3xl font-semibold ">Meet the Team</div>
        <div className="text-lg text-gray-700 mt-2 text-center max-w-3xl px-2">
          Our dedicated team is focused on delivering powerful solutions, from
          building dynamic web scrapers to deploying full-stack applications.
        </div>
      </div>
      {/* Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-5">
          <TeamCard
            name="Jeff Zhang"
            role="Frontend Developer"
            image="/jeffzhang.jpg"
          />
          <TeamCard
            name="Jeff Zhang"
            role="Frontend Developer"
            image="/jeffzhang.jpg"
          />
          <TeamCard
            name="Jeff Zhang"
            role="Frontend Developer"
            image="/jeffzhang.jpg"
          />
          <TeamCard
            name="Jeff Zhang"
            role="Frontend Developer"
            image="/jeffzhang.jpg"
          />
          <TeamCard
            name="Jeff Zhang"
            role="Frontend Developer"
            image="/jeffzhang.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
