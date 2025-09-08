import React from "react";

const Card: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl">
    <div className="flex items-center justify-center h-16 w-16 bg-[#50E3C2] rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

export default Card;
