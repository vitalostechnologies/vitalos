import React from "react";

type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  onClick?: () => void;
  tags?: string[];
  cover?: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, onClick, tags, cover }) => {
  return (
    <article
      className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      {/* Image or placeholder */}
      {cover ? (
        <img src={cover} alt="" className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 text-white/40 text-sm">
          No Image
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{date}</p>
        <p className="mt-3 text-white/80">{excerpt}</p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded-full border border-white/10 bg-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <span className="mt-4 inline-block text-[#50E3C2]">Read more →</span>
      </div>
    </article>
  );
};

export default BlogCard;
