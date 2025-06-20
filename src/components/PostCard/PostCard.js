'use client';

import Link from 'next/link';
import { MessageSquare, Calendar, User, Tag } from 'lucide-react';
import { FaMapPin } from 'react-icons/fa';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import PostThumbnail from 'components/PostThumbnail';

import styles from './PostCard.module.scss';

function PostTitle({ title, comments, slug }) {
  return (
    <div className={styles.postTitle}>
      <Link
        href={postPathBySlug(slug)}
        title={title}
        className={styles.postTitleLink}
      >
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      {comments !== undefined && (
        <span className={styles.commentsCount} title="Коментарі">
          <MessageSquare className={styles.commentsIcon} />
          {comments}
        </span>
      )}
    </div>
  );
}

function Categories({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/category/${category.slug}`}
          className={styles.categoryTag}
        >
          <Tag className={styles.categoryIcon} />
          {category.name}
        </Link>
      ))}
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('uk-UA', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
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

  let avatarUrl = '';
  if (author && author.avatar && author.avatar.url) {
    avatarUrl = author.avatar.url;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <article className={postCardStyle}>
      {isSticky && (
        <div className={styles.stickyIndicator}>
          <FaMapPin aria-label="Sticky Post" className={styles.stickyIcon} />
        </div>
      )}

      {featuredImage && (
        <div className={styles.featuredImageContainer}>
          <PostThumbnail
            thumbnail={featuredImage}
            title={title}
            unoptimized={unoptimized}
            imageProps={imageProps}
          />
          <div className={styles.imageOverlay}></div>
        </div>
      )}

      <div className={styles.postContent}>
        <PostTitle title={title} comments={comments} slug={slug} />

        {!excludeMetadata.includes('categories') && (
          <Categories categories={categories} />
        )}

        {excerpt && (
          <div
            className={styles.postExcerpt}
            dangerouslySetInnerHTML={{
              __html: sanitizeExcerpt(excerpt),
            }}
          />
        )}

        <div className={styles.metadataFooter}>
          <div className={styles.authorContainer}>
            {!excludeMetadata.includes('author') && author && (
              <div className={styles.authorInfo}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={author.name}
                    className={styles.authorAvatar}
                  />
                ) : (
                  <div className={styles.authorAvatarPlaceholder}>
                    <User />
                  </div>
                )}
                <div className={styles.authorName}>
                  <User className={styles.authorIcon} />
                  <span>{author.name}</span>
                </div>
              </div>
            )}
          </div>

          {!excludeMetadata.includes('date') && date && (
            <div className={styles.dateInfo}>
              <Calendar className={styles.dateIcon} />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          )}
        </div>
      </div>

      <div className={styles.hoverOverlay}></div>
    </article>
  );
};

export default PostCard;
