import BlogList from '@/components/organisms/BlogList';
import { getPosts } from '@/utils/api/posts';
import type { PostType } from '@/utils/api/types';

// ===============================================================

// Force static generation
export const dynamic = 'force-static';

// Invalidate cache: 1 day
export const revalidate = 86400;
// export const revalidate = 120;

// ===============================================================

interface Props {}

export default async function Home() {
  // const data = await fetch('https://api.vercel.app/blog');
  // const posts: Post[] = await data.json();

  const posts: PostType[] = await getPosts();

  console.log('HOME', posts);

  return (
    <>
      <BlogList posts={posts} />
    </>
  );
}

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Newest blog posts',
};
