import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/site/page-layout";
import { BlogPostContent } from "./blog-post-content";
import blogs from "@/data/blogs.json";

export function generateStaticParams() {
  return blogs.items.map((b) => ({ slug: b.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(props: any) {
  const { slug } = await props.params;
  const post = blogs.items.find((b: { slug: string }) => b.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | Maram Group` };
}

export type BlogPostProps = {
  post: (typeof blogs.items)[number];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPostPage(props: any) {
  const { slug } = await props.params;
  const post = blogs.items.find((b: { slug: string }) => b.slug === slug);
  if (!post) notFound();

  return (
    <PageLayout>
      <Suspense>
        <BlogPostContent post={post} />
      </Suspense>
    </PageLayout>
  );
}
