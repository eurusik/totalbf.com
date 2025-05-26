'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import Metadata from 'components/Metadata';
import PostThumbnail from 'components/PostThumbnail';
import { FaMapPin } from 'react-icons/fa';

import styles from './PostCard.module.scss';

function PostTitle({ title, comments, slug }) {
  const t = useTranslations('news');

  return (
    <div className={styles.postTitle}>
      <Link
        href={postPathBySlug(slug)}
        title={title}
        className={styles.postTitleLink}
      >
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      {comments !== undefined && (
        <span className={styles.commentsCount} title={t('comments')}>
          <MessageSquare className={styles.commentsIcon} />
          {comments}
        </span>
      )}
    </div>
  );
}

const PostCard = ({ post, options = {} }) => {
  const {
    title,
    excerpt,
    slug,
    date,
    author,
    categories,
    isSticky = false,
    comments,
    featuredImage,
  } = post;
  const {
    excludeMetadata = [],
    unoptimized = false,
    imageProps = {},
  } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <div className={postCardStyle}>
      {isSticky && (
        <FaMapPin aria-label="Sticky Post" className={styles.stickyIcon} />
      )}
      <PostTitle title={title} comments={comments} slug={slug} />
      <div className={styles.postContent}>
        <PostThumbnail
          thumbnail={featuredImage}
          title={title}
          unoptimized={unoptimized}
          imageProps={imageProps}
        />
        {excerpt && (
          <div
            className={styles.postExcerpt}
            dangerouslySetInnerHTML={{
              __html: sanitizeExcerpt(excerpt),
            }}
          />
        )}
      </div>
      <Metadata className={styles.postCardMetadata} {...metadata} />
    </div>
  );
};

export default PostCard;
