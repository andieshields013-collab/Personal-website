import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    content,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPostFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  const fileName = `${slug}.md`;
  const fullPath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return readPostFile(fileName);
}
