import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';
import { Helmet } from 'react-helmet';
import { useTranslations } from 'next-intl';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts, pagination }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;
  const t = useTranslations('home');

  return (
    <Layout>
      <Helmet>
        <title>{t('siteTitle')}</title>
        <meta name="description" content={description || t('siteDescription')} />
        <meta property="og:title" content={t('siteTitle')} />
        <meta property="og:description" content={description || t('siteDescription')} />
        <meta name="twitter:title" content={t('siteTitle')} />
        <meta name="twitter:description" content={description || t('siteDescription')} />
      </Helmet>
      <WebsiteJsonLd siteTitle={title} />
      <Section>
        <Container>
          <h2 className="sr-only">Posts</h2>
          <ul className={styles.posts}>
            {posts.map((post) => {
              return (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              );
            })}
          </ul>
          {pagination && (
            <Pagination
              addCanonical={false}
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
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
