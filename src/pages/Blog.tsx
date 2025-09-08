import React, { useMemo, useState } from "react";
import BlogCard from "../components/BlogCard";
import SectionHero from "../components/SectionHero";
import { BLOG_POSTS } from "../data/blog";
import Newsletter from "../components/Newsletter";

type Props = { onOpenPost: (slug: string) => void };

// Collect unique tags from posts
const allTags = Array.from(
  new Set(BLOG_POSTS.flatMap((p) => p.tags ?? []))
).sort();

const BlogPage: React.FC<Props> = ({ onOpenPost }) => {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter posts by query + tag
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(query));

      const matchesTag = !activeTag || (p.tags ?? []).includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [q, activeTag]);

  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Blog"
        subtitle="Insights, news, and updates"
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search box */}
        <div className="w-full md:w-1/2">
          <label htmlFor="blog-search" className="sr-only">
            Search posts
          </label>
          <input
            id="blog-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-[#50E3C2]"
          />
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full border transition ${
              activeTag
                ? "border-white/10 bg-white/5 hover:border-white/20"
                : "border-[#50E3C2]/60 bg-[#50E3C2]/10"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t === activeTag ? null : t)}
              className={`px-3 py-1 rounded-full border transition ${
                t === activeTag
                  ? "border-[#50E3C2]/60 bg-[#50E3C2]/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-white/70">No posts match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <BlogCard
              key={p.slug}
              title={p.title}
              excerpt={p.excerpt}
              date={new Date(p.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              tags={p.tags}
              cover={p.cover} // pass cover or show placeholder inside BlogCard
              onClick={() => onOpenPost(p.slug)}
            />
          ))}
        </div>
      )}
      <section className="py-20 px-6">
  <div className="container mx-auto max-w-3xl">
    <Newsletter />
  </div>
</section>
    </main>
  );
};

export default BlogPage;
