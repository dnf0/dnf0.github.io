import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project case studies in data engineering and geospatial analytics.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
