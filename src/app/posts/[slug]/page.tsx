import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Personal Website`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-20 text-foreground">
      <article className="mx-auto w-full max-w-3xl pt-8">
        <header className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold underline-offset-4 hover:underline">
            Back home
          </Link>
          <ThemeToggle />
        </header>

        <div className="mb-10 border-b pb-8">
          <p className="mb-3 text-sm text-muted-foreground">{post.date}</p>
          <h1 className="mb-4 text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
        </div>

        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="mb-3 mt-8 text-2xl font-semibold">{children}</h2>
            ),
            p: ({ children }) => <p className="mb-5 leading-7">{children}</p>,
            ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>,
            ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6">{children}</ol>,
            a: ({ children, href }) => (
              <a className="underline hover:text-muted-foreground" href={href}>
                {children}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
