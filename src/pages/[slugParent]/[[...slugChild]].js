import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';
import Breadcrumbs from 'components/Breadcrumbs';

import styles from 'styles/pages/Page.module.scss';

export default function Page({ page, breadcrumbs }) {
  const {
    title,
    metaTitle,
    description,
    slug,
    content,
    featuredImage,
    children,
  } = page;

  const { metadata: siteMetadata = {} } = useSite();

  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const hasChildren = Array.isArray(children) && children.length > 0;
  const hasBreadcrumbs = Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      {hasBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      {featuredImage && (
        <FeaturedImage
          {...featuredImage}
          src={featuredImage.sourceUrl}
          dangerouslySetInnerHTML={featuredImage.caption}
        />
      )}
      <h1 className={styles.title}>{title}</h1>

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>

        {hasChildren && (
          <Section className={styles.sectionChildren}>
            <Container>
              <aside>
                <p className={styles.childrenHeader}>
                  <strong>{title}</strong>
                </p>
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.id}>
                        <Link href={child.uri}>{child.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Container>
          </Section>
        )}
      </Content>
    </Layout>
  );
}

export async function getServerSideProps({ params = {} } = {}) {
  const { slugParent, slugChild } = params;

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`;

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  // In order to show the proper breadcrumbs, we need to find the entire
  // tree of pages. Rather than querying every segment, the query should
  // be cached for all pages, so we can grab that and use it to create
  // our trail

  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);

  return {
    props: {
      page,
      breadcrumbs,
    },
  };
}
