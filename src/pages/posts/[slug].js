'use client';

import Head from 'next/head';
import { Helmet } from 'react-helmet';
import Link from 'next/link';

import { getPostBySlug, getRelatedPosts, postPathBySlug } from 'lib/posts';
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

export default function Post({ post, socialImage, related }) {
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

  const relatedPostsList = related?.posts || [];
  const relatedPostsTitle = related?.title || {};

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Helmet {...helmetSettingsWithoutTitle} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <div className={styles.postHeader}>
        <Container>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </Container>
      </div>

      {featuredImage && (
        <div className={styles.featuredImageContainer}>
          <PostThumbnail
            thumbnail={featuredImage}
            title={title}
            unoptimized={true}
          />
        </div>
      )}

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

      {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
        <Section className={styles.postFooter}>
          <Container>
            <div className={styles.relatedPosts}>
              {relatedPostsTitle.name ? (
                <span>
                  Більше з категорії{' '}
                  <Link href={relatedPostsTitle.link}>
                    {relatedPostsTitle.name}
                  </Link>
                </span>
              ) : (
                <span>Схожі статті</span>
              )}
              <ul>
                {relatedPostsList.map((relatedPost) => (
                  <li key={relatedPost.title}>
                    <Link href={postPathBySlug(relatedPost.slug)}>
                      {relatedPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}
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
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
