import { getPaginatedPosts } from 'lib/posts';
import TemplatePosts from 'templates/posts';

export default function Home({ posts, pagination, seoMetadata }) {
  return (
    <TemplatePosts
      title="Головна"
      posts={posts}
      pagination={pagination}
      metadata={seoMetadata}
    />
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'all',
  });

  const { getSiteMetadata } = await import('lib/site');
  const seoMetadata = await getSiteMetadata();

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
      seoMetadata,
    },
    revalidate: 60,
  };
}
