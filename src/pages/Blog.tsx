import React from "react";
import BlogCard from "../components/BlogCard";

const BlogPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-12">Our Blog</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogCard
        title="The Future of AI in Mental Health"
        excerpt="How AI is shaping the next generation of mental wellness tools and therapies."
        date="October 26, 2024"
      >
        How AI is shaping the next generation of mental wellness tools and therapies.
      </BlogCard>
      <BlogCard
        title="Personalizing Therapy with Machine Learning"
        excerpt="Tailoring treatment plans to individual needs with data-driven insights."
        date="September 15, 2024"
      >
        Tailoring treatment plans to individual needs with data-driven insights.
      </BlogCard>
      <BlogCard
        title="Building Trust in AI Healthcare"
        excerpt="Our ethical approach to data privacy and patient security."
        date="August 20, 2024"
      >
        Our ethical approach to data privacy and patient security.
      </BlogCard>
    </div>
  </main>
);

export default BlogPage;
