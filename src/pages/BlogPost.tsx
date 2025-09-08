// src/pages/BlogPost.tsx
import React, { useEffect, useState } from "react";
import SectionHero from "../components/SectionHero";
import { BLOG_POSTS } from "../data/blog";
import { remark } from "remark";
import html from "remark-html";

type Props = { slug: string | null; onBack: () => void; };

const BlogPost: React.FC<Props> = ({ slug, onBack }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const [rendered, setRendered] = useState<string>("");

  useEffect(() => {
    if (!post) return;
    (async () => {
      const file = await remark().use(html).process(post.content);
      setRendered(String(file));
    })();
  }, [post]);

  if (!post) {
    return (
      <main className="pt-20 container mx-auto px-6 py-12">
        <SectionHero title="Blog" subtitle="Post not found" />
        <button onClick={onBack} className="text-[#50E3C2] hover:underline">← Back to Blog</button>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <SectionHero
        title={post.title}
        subtitle={new Date(post.date).toLocaleDateString("en-GB", { year:"numeric", month:"long", day:"numeric" })}
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />
      <div className="container mx-auto px-6 prose prose-invert max-w-3xl">
        <div dangerouslySetInnerHTML={{ __html: rendered }} />
        <div className="mt-10">
          <button onClick={onBack} className="text-[#50E3C2] hover:underline">← All Blog posts</button>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
