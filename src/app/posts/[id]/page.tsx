import { Metadata } from 'next';

import BlogPost from '@/components/organisms/BlogPost';

// ===============================================================

export const dynamic = 'force-dynamic';

// ===============================================================

interface Post {
  id: string;
  title: string;
  content: string;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const data = await fetch(`https://api.vercel.app/blog/${id}`);
  const post: Post[] = await data.json();

  return <BlogPost {...post} />;
}

// ===============================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const data = await fetch(`https://api.vercel.app/blog/${id}`);
  const post: Post[] = await data.json();

  // const user = await getUserPublic(id);

  return { title: `Blog | Post ${post.id}`, description: `${post.author} | ${post.title}` };
}
