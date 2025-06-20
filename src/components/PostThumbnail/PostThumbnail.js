import Image from 'next/image';
import styles from './PostThumbnail.module.scss';

function PostThumbnail({ thumbnail, title, unoptimized = true }) {
  if (!thumbnail) {
    return null;
  }

  const src = thumbnail.sourceUrl;
  const alt = thumbnail.altText || title;
  const srcSet = thumbnail.srcSet;

  return (
    <div className={styles.postThumbnail}>
      <Image
        src={src}
        alt={alt}
        title={title || alt}
        fill={true}
        sizes="100vw"
        className={styles.thumbnailImage}
        priority={true}
        unoptimized={unoptimized}
        quality={100}
        srcSet={srcSet}
      />
    </div>
  );
}

export default PostThumbnail;
