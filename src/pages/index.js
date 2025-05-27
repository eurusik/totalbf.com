import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';
import Head from 'next/head';
import { Helmet } from 'react-helmet';
import { helmetSettingsFromMetadata } from 'lib/site';
import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';
import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts, pagination, seoMetadata }) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  const metadataToUse = seoMetadata || metadata;

  const helmetSettings = helmetSettingsFromMetadata(metadataToUse, {
    setTitle: true,
  });

  const pageTitle = metadataToUse.title;
  const pageDescription = metadataToUse.description;
  const helmetSettingsWithoutTitle = { ...helmetSettings };

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Helmet {...helmetSettingsWithoutTitle} />
      <WebsiteJsonLd siteTitle={title} />
      <Section>
        <Container>
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
    // Регенерація сторінки кожні 60 секунд (1 хвилина)
    revalidate: 60,
  };
}
