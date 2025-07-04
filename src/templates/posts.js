import useSite from 'hooks/use-site';
import { WebsiteJsonLd } from 'lib/json-ld';
import Head from 'next/head';
import { Helmet } from 'react-helmet';
import { helmetSettingsFromMetadata } from 'lib/site';
import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';
import homeStyles from '../styles/pages/Home.module.scss';

export default function TemplatePosts({
  posts,
  pagination,
  metadata = {},
  customPageTitle = null,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  const metadataToUse = metadata || siteMetadata;

  const helmetSettings = helmetSettingsFromMetadata(metadataToUse, {
    setTitle: false,
  });

  const pageDescription = metadataToUse.description || '';

  const title = customPageTitle || metadataToUse.title;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Helmet {...helmetSettings} />
      <WebsiteJsonLd siteTitle={title} />

      <Section>
        <Container>
          <ul className={homeStyles.posts}>
            {Array.isArray(posts) &&
              posts.map((post) => {
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
