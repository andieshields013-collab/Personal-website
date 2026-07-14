import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAllPosts } from "@/lib/posts";

const interests = [
  {
    title: "Things I'm Learning",
    description: "A place for school topics, skills, and questions I want to understand better.",
  },
  {
    title: "Things I Like",
    description: "Books, games, music, sports, art, videos, ideas, and anything else worth keeping.",
  },
  {
    title: "Projects",
    description: "Small experiments, creative work, and stuff I build or try with help from Codex.",
  },
];

function LacePanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="lace-panel">
      <div className="lace-panel-content">
        <h2 className="mb-3 text-center font-serif text-3xl leading-tight text-black md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto max-w-xl text-center text-sm leading-6 text-zinc-700">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background px-4 pb-20 text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 pt-8">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="font-semibold">
            Personal Website
          </Link>
          <ThemeToggle />
        </header>

        <section className="overflow-hidden rounded-lg border border-blue-200 bg-[#5f9dca] shadow-sm dark:border-blue-900">
          <Image
            src="/images/typewriter-hero.png"
            alt="Typewriter collage intro for Andie Shields"
            className="h-auto w-full"
            width={1536}
            height={1024}
            priority
          />
        </section>

        <div className="space-y-7">
          {interests.map((interest) => (
            <LacePanel key={interest.title} title={interest.title}>
              <p>{interest.description}</p>
            </LacePanel>
          ))}

          <LacePanel title="Writing">
            <div className="text-left">
              <ul className="space-y-5">
                {posts.map((post) => (
                  <li className="border-b border-zinc-300/70 pb-5 last:border-b-0 last:pb-0" key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-semibold text-black underline-offset-4 hover:underline"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-sm text-zinc-700">{post.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-600">
                      <time>{post.date}</time>
                      {post.tags.map((tag) => (
                        <span className="rounded-md bg-white/70 px-2 py-1" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </LacePanel>
        </div>
      </div>
    </main>
  );
}
