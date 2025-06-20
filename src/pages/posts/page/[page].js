import { getPaginatedPosts } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';
import { getSiteMetadata } from 'lib/site';

import TemplatePosts from 'templates/posts';

export default function Posts({ posts, pagination, siteTitle }) {
  const title = `Всі пости`;
  const slug = 'posts';

  const customPageTitle = `${siteTitle} | Сторінка ${pagination.currentPage}`;

  const { metadata } = usePageMetadata({
    metadata: {
      title: customPageTitle,
      description: `Сторінка ${pagination.currentPage}`,
    },
  });

  return (
    <TemplatePosts
      title={title}
      posts={posts}
      slug={slug}
      pagination={pagination}
      metadata={metadata}
      customPageTitle={customPageTitle}
    />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: params?.page,
    queryIncludes: 'all',
  });

  if (!pagination.currentPage) {
    return {
      props: {},
      notFound: true,
    };
  }

  const siteMetadata = await getSiteMetadata();

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
      siteTitle: siteMetadata.siteTitle,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
