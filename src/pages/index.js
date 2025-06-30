import { getPaginatedPosts } from 'lib/posts';
import TemplatePosts from 'templates/posts';
import { getSiteMetadata } from 'lib/site';

export default function Home({
  posts,
  pagination,
  seoMetadata,
  customPageTitle,
}) {
  return (
    <TemplatePosts
      posts={posts}
      pagination={pagination}
      metadata={seoMetadata}
      customPageTitle={customPageTitle}
    />
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'all',
  });

  const siteMetadata = await getSiteMetadata();

  const siteName = siteMetadata?.title || siteMetadata?.siteTitle || 'TOTALBF';
  const pageName = 'Головна';

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
      seoMetadata: siteMetadata,
      customPageTitle: `${siteName} | ${pageName}`,
    },
    revalidate: 60,
  };
}
