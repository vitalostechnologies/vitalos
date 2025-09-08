import React from "react";

type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  onClick?: () => void;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, onClick }) => {
  return (
    <div
      className="bg-[#1a1a1a] rounded-lg p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-[#50E3C2] mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{excerpt}</p>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
  );
};

export default BlogCard;
