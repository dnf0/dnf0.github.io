import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts on data engineering, geospatial analytics, and pipeline design.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
