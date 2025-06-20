import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedPosts } from 'lib/posts';

import TemplatePosts from 'templates/posts';

export default function Posts({ posts, pagination }) {
  const title = 'Всі пости';
  const slug = 'posts';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: 'Всі публікації на сайті',
    },
  });

  return (
    <TemplatePosts
      title={title}
      posts={posts}
      slug={slug}
      pagination={pagination}
      metadata={metadata}
    />
  );
}

export async function getServerSideProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'all',
  });
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
