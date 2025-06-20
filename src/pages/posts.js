import { getAllPosts } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';
import { getSiteMetadata } from 'lib/site';

import TemplatePosts from 'templates/posts';

export default function Posts({ posts, customPageTitle }) {
  const slug = 'posts';

  const { metadata } = usePageMetadata({
    metadata: {
      title: customPageTitle,
      description: 'Архів всіх постів на сайті',
    },
  });

  return (
    <TemplatePosts
      posts={posts}
      slug={slug}
      metadata={metadata}
      customPageTitle={customPageTitle}
    />
  );
}

export async function getStaticProps() {
  const { posts } = await getAllPosts({
    queryIncludes: 'all',
  });

  const siteMetadata = await getSiteMetadata();

  const siteName = siteMetadata?.title || siteMetadata?.siteTitle;
  const pageTitle = 'Всі пости';

  return {
    props: {
      posts,
      customPageTitle: `${siteName} | ${pageTitle}`,
    },
  };
}
