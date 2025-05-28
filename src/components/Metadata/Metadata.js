import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { authorPathByName } from 'lib/users';
import ClassName from 'models/classname';
import PublicationDate from 'components/PublicationDate';

import { FaMapPin } from 'react-icons/fa';
import styles from './Metadata.module.scss';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: false,
};

const Metadata = ({
  className,
  author,
  date,
  categories,
  isSticky = false,
  options = DEFAULT_METADATA_OPTIONS,
}) => {
  const metadataClassName = new ClassName(styles.metadata);

  metadataClassName.addIf(className, className);

  const renderCategories = () => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return null;
    }

    const maxVisible = options.compactCategories ? 3 : categories.length;
    const visibleCategories = categories.slice(0, maxVisible);
    const remainingCount = categories.length - maxVisible;

    return (
      <div className={styles.metadataCategories}>
        {visibleCategories.map((category) => (
          <Link
            key={category.slug}
            href={categoryPathBySlug(category.slug)}
            className={styles.categoryTag}
          >
            {category.name}
          </Link>
        ))}
        {remainingCount > 0 && (
          <span className={styles.moreCategories}>+{remainingCount} ще</span>
        )}
      </div>
    );
  };

  return (
    <ul className={`${metadataClassName.toString()} ${styles.metadataLayout}`}>
      <div className={styles.metadataLeft}>
        {author && (
          <li className={styles.metadataAuthor}>
            <div className={styles.authorContainer}>
              <address>
                {author.avatar && (
                  <img
                    width={author.avatar.width}
                    height={author.avatar.height}
                    src={author.avatar.url || '/placeholder.svg'}
                    alt="Аватар автора"
                  />
                )}
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>
                    <Link href={authorPathByName(author.name)} rel="author">
                      {author.name}
                    </Link>
                  </span>
                  {renderCategories()}
                </div>
              </address>
            </div>
          </li>
        )}
      </div>

      <div className={styles.metadataRight}>
        {date && (
          <li>
            <PublicationDate date={date} />
          </li>
        )}

        {isSticky && (
          <li className={styles.metadataSticky}>
            <FaMapPin aria-label="Sticky Post" />
          </li>
        )}
      </div>
    </ul>
  );
};

export default Metadata;
