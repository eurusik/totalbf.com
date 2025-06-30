import Link from 'next/link';
import Head from 'next/head';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import usePageMetadata from 'hooks/use-page-metadata';
import { getSiteMetadata } from 'lib/site';
import { helmetSettingsFromMetadata } from 'lib/site';

import styles from 'styles/pages/Error.module.scss';

export default function Custom404({ customPageTitle }) {
  const { metadata } = usePageMetadata({
    metadata: {
      title: customPageTitle,
      description: 'Сторінку не знайдено',
    },
  });

  const helmetSettings = helmetSettingsFromMetadata(metadata);
  const pageTitle = helmetSettings.title || customPageTitle;
  const helmetSettingsWithoutTitle = { ...helmetSettings };
  delete helmetSettingsWithoutTitle.title;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Helmet {...helmetSettingsWithoutTitle} />
      <Section>
        <Container>
          <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
              <h1 className={styles.errorTitle}>404</h1>
              <h2 className={styles.errorSubtitle}>Сторінку не знайдено</h2>
              <p className={styles.errorMessage}>
                На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
              </p>
              <div className={styles.errorActions}>
                <Link href="/" className={styles.errorButton}>
                  На головну сторінку
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const siteMetadata = await getSiteMetadata();

  const siteName = siteMetadata?.title || siteMetadata?.siteTitle || 'TOTALBF';
  const pageName = 'Сторінку не знайдено';

  return {
    props: {
      siteMetadata,
      customPageTitle: `${siteName} | ${pageName}`,
    },
  };
}
