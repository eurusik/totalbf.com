import Link from 'next/link';
import Head from 'next/head';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import { SiteContext, useSiteContext } from 'hooks/use-site';
import { getSiteMetadata } from 'lib/site';

import styles from 'styles/pages/Error.module.scss';

export default function Custom404({ siteMetadata }) {
  const siteTitle = siteMetadata?.title;
  const pageDescription = 'Сторінку не знайдено';

  const site = useSiteContext({
    metadata: {
      title: siteTitle,
      description: pageDescription,
    },
  });

  const pageTitle = `${siteTitle} | ${pageDescription}`;

  return (
    <SiteContext.Provider value={site}>
      <Layout>
        <Head>
          <title>{pageTitle}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <Section>
          <Container>
            <div className={styles.errorContainer}>
              <div className={styles.errorContent}>
                <h1 className={styles.errorTitle}>404</h1>
                <h2 className={styles.errorSubtitle}>{pageDescription}</h2>
                <p className={styles.errorMessage}>
                  На жаль, сторінка, яку ви шукаєте, не існує або була
                  переміщена.
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
    </SiteContext.Provider>
  );
}

export async function getStaticProps() {
  const siteMetadata = await getSiteMetadata();

  return {
    props: {
      siteMetadata,
    },
  };
}
