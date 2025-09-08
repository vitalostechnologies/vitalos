// src/pages/BlogPost.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionHero from "../components/SectionHero";
import { BLOG_POSTS } from "../data/blog";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { Share2, Twitter, Linkedin } from "lucide-react";

import { motion } from "framer-motion";

type Props = {
  slug: string | null;
  onBack: () => void;
  /** optional: navigate to another post by slug (enables Prev/Next) */
  onNavigate?: (slug: string) => void;
};

// helpers
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const calcReadingTime = (md: string) => {
  const words = md.trim().split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

const extractHeadings = (md: string) => {
  const lines = md.split("\n");
  const headings: { level: 2 | 3; text: string }[] = [];
  for (const l of lines) {
    const h2 = l.match(/^##\s+(.*)$/);
    const h3 = l.match(/^###\s+(.*)$/);
    if (h2) headings.push({ level: 2, text: h2[1].trim() });
    else if (h3) headings.push({ level: 3, text: h3[1].trim() });
  }
  return headings;
};

const BlogPost: React.FC<Props> = ({ slug, onBack, onNavigate }) => {
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[postIndex] ?? null;

  const [rendered, setRendered] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const readingTime = useMemo(() => (post ? calcReadingTime(post.content) : ""), [post]);
  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);

  useEffect(() => {
    if (!post) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      const file = await remark().use(gfm).use(html).process(post.content);
      const withSafeLinks = String(file).replaceAll(
        /<a\s+href="(.*?)"(.*?)>/g,
        (_m, href, rest) =>
          `<a href="${href}" ${rest} ${
            href.startsWith("#") || href.startsWith("/") ? "" : 'target="_blank" rel="noopener"'
          }>`
      );
      if (mounted) {
        setRendered(withSafeLinks);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [post]);

  useEffect(() => {
    if (!containerRef.current) return;
    const hs = Array.from(containerRef.current.querySelectorAll("h2, h3")) as HTMLElement[];
    hs.forEach((el) => {
      if (!el.id) el.id = slugify(el.textContent || "");
    });
  }, [rendered]);

  if (!post) {
    return (
      <main className="pt-20 container mx-auto px-6 py-12">
        <SectionHero title="Blog" subtitle="Post not found" />
        <button onClick={onBack} className="text-[#50E3C2] hover:underline">← Back to Blog</button>
      </main>
    );
  }

  const prev = BLOG_POSTS[postIndex - 1];
  const next = BLOG_POSTS[postIndex + 1];
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : `https://vitalos.co.uk/blog/${post.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt || post.title, url: shareUrl });
      } catch { /* noop */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard");
      } catch {
        window.prompt("Copy this link:", shareUrl);
      }
    }
  };

  return (
    <main className="pt-20">
      <SectionHero
        title={post.title}
        subtitle={`${formatDate(post.date)} • ${readingTime}`}
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />

      {/* Meta strip */}
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1">#{t}</span>
              ))}
            </div>
          ) : null}
          <span className="ml-auto flex items-center gap-4">
  <button
    onClick={handleShare}
    className="text-[#50E3C2] hover:text-white transition-colors"
    aria-label="Share or Copy Link"
  >
    <Share2 size={20} />
  </button>
  <a
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener"
    aria-label="Share on Twitter"
    className="text-[#50E3C2] hover:text-white transition-colors"
  >
    <Twitter size={20} />
  </a>
  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener"
    aria-label="Share on LinkedIn"
    className="text-[#50E3C2] hover:text-white transition-colors"
  >
    <Linkedin size={20} />
  </a>
</span>

        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_minmax(240px,280px)] gap-10">
        {/* Article */}
        {/* Article */}
<motion.article
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className="prose prose-invert max-w-3xl
             prose-headings:scroll-mt-24
             prose-h1:text-white prose-h2:text-white prose-h3:text-gray-100
             prose-a:text-[#50E3C2] prose-a:no-underline hover:prose-a:underline
             prose-strong:text-white
             prose-blockquote:border-[#50E3C2]/40 prose-blockquote:text-gray-200
             prose-hr:border-white/10
             prose-li:marker:text-white/40
             prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
             prose-img:rounded-xl prose-img:border prose-img:border-white/10
             prose-h2:mt-10 prose-h2:mb-3 prose-h3:mt-8 prose-h3:mb-2"
>
  {/* Cover image as a normal block (no wrap) */}
  {post.cover && (
    <img
      src={post.cover}
      alt={post.title}
      className="w-full mb-8 rounded-xl border border-white/10 object-cover"
      loading="lazy"
    />
  )}

  {loading ? (
    <div className="animate-pulse">
      <div className="h-6 w-2/3 bg-white/10 rounded mb-4" />
      <div className="h-4 w-full bg-white/10 rounded mb-2" />
      <div className="h-4 w-11/12 bg-white/10 rounded mb-2" />
      <div className="h-4 w-10/12 bg-white/10 rounded mb-2" />
      <div className="h-64 w-full bg-white/10 rounded mt-6" />
    </div>
  ) : (
    // 🔥 Enforce spacing regardless of prose defaults
    <div
      ref={containerRef}
      className="
        [&>p]:mb-6 [&>p]:leading-relaxed
        [&>ul]:my-6 [&>ol]:my-6 [&>li]:mb-2
        [&>h2]:mt-10 [&>h2]:mb-3
        [&>h3]:mt-8  [&>h3]:mb-2
        [&>blockquote]:my-6
        [&>img]:my-6
      "
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  )}

  <div className="mt-10">
    <button onClick={onBack} className="text-[#50E3C2] hover:underline">← All Blog posts</button>
  </div>
</motion.article>


        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-auto">
          {/* ToC */}
          {headings.length > 0 && (
            <div className="rounded-xl border border-white/10 p-5 mb-6 bg-[#0b0b0b]">
              <h4 className="text-sm font-semibold text-white mb-3">On this page</h4>
              <nav className="space-y-2">
                {headings.map(({ level, text }) => {
                  const id = slugify(text);
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`block text-sm hover:text-white ${level === 3 ? "pl-4 text-gray-400" : "text-gray-300"}`}
                    >
                      {text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="rounded-xl border border-white/10 p-5 bg-[#0b0b0b]">
              <h4 className="text-sm font-semibold text-white mb-3">More stories</h4>
              <div className="space-y-3">
                {prev && (
                  <button
                    onClick={() => onNavigate?.(prev.slug)}
                    className="block text-left w-full"
                    aria-label="Previous article"
                  >
                    <div className="text-xs uppercase tracking-wide text-gray-400">Previous</div>
                    <div className="text-[#50E3C2] hover:underline">{prev.title}</div>
                  </button>
                )}
                {next && (
                  <button
                    onClick={() => onNavigate?.(next.slug)}
                    className="block text-left w-full"
                    aria-label="Next article"
                  >
                    <div className="text-xs uppercase tracking-wide text-gray-400">Next</div>
                    <div className="text-[#50E3C2] hover:underline">{next.title}</div>
                  </button>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default BlogPost;
