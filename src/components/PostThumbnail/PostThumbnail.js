import Image from 'next/image';
import styles from './PostThumbnail.module.scss';

function PostThumbnail({ thumbnail, title, unoptimized = true, imageProps = {} }) {
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
        width={imageProps.width || 960}
        height={imageProps.height || 150}
        className={styles.thumbnailImage}
        priority={true}
        unoptimized={unoptimized}
        quality={100}
        srcSet={srcSet}
        {...imageProps}
      />
    </div>
  );
}

export default PostThumbnail;
