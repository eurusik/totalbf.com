import Head from 'next/head';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getRelatedPosts } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import PostThumbnail from 'components/PostThumbnail/PostThumbnail';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, socialImage }) {
  const {
    title,
    metaTitle,
    description,
    content,
    date,
    author,
    categories,
    featuredImage,
    isSticky = false,
  } = post;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactCategories: false,
  };

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  const pageTitle = helmetSettings.title;
  const helmetSettingsWithoutTitle = { ...helmetSettings };
  delete helmetSettingsWithoutTitle.title;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Helmet {...helmetSettingsWithoutTitle} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <div style={{ margin: '0 1rem' }}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        {featuredImage && (
          <PostThumbnail
            thumbnail={featuredImage}
            title={title}
            unoptimized={true}
            imageProps={{ quality: 100 }}
          />
        )}
      </div>

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content?.replace(/class="mtz-vlc-[^"]*"/g, ''),
              }}
            />
            <Metadata
              className={styles.postMetadata}
              date={date}
              author={author}
              categories={categories}
              options={metadataOptions}
              isSticky={isSticky}
            />
          </Container>
        </Section>
      </Content>

      {/* <Section className={styles.postFooter}>
        <Container>
          <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
          {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
            <div className={styles.relatedPosts}>
              {relatedPostsTitle.name ? (
                <span>
                  More from <Link href={relatedPostsTitle.link}>{relatedPostsTitle.name}</Link>
                </span>
              ) : (
                <span>More Posts</span>
              )}
              <ul>
                {relatedPostsList.map((post) => (
                  <li key={post.title}>
                    <Link href={postPathBySlug(post.slug)}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section> */}
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { categories, databaseId: postId } = post;

  const props = {
    post,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { category: relatedCategory, posts: relatedPosts } =
    (await getRelatedPosts(categories, postId)) || {};
  const hasRelated =
    relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  if (hasRelated) {
    props.related = {
      posts: relatedPosts,
      title: {
        name: relatedCategory.name || null,
        link: categoryPathBySlug(relatedCategory.slug),
      },
    };
  }

  return {
    props,
    // Регенерація сторінки кожні 60 секунд (1 хвилина)
    revalidate: 60,
  };
}

// Необхідно додати getStaticPaths для роботи з динамічними маршрутами
export async function getStaticPaths() {
  // Замість предварительної генерації всіх шляхів, ми використовуємо fallback: 'blocking'
  // Це означає, що сторінки будуть генеруватися на запит і кешуватися для майбутніх запитів
  return {
    paths: [],
    fallback: 'blocking',
  };
}
