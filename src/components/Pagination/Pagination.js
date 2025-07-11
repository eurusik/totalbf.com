import Link from 'next/link';

import config from '../../../package.json';
import { Helmet } from 'react-helmet';

import {
  HiChevronLeft as PreviousIcon,
  HiChevronRight as NextIcon,
} from 'react-icons/hi';
import { HiOutlineDotsHorizontal as Dots } from 'react-icons/hi';
import styles from './Pagination.module.scss';

const MAX_NUM_PAGES = 9;

const { homepage = '' } = config;

const Pagination = ({
  pagesCount,
  currentPage,
  basePath,
  addCanonical = true,
}) => {
  const path = `${basePath}/page/`;

  const hasPreviousPage = pagesCount > 1 && currentPage > 1;
  const hasNextPage = pagesCount > 1 && currentPage < pagesCount;

  let hasPrevDots = false;
  let hasNextDots = false;

  function getPages() {
    let pages = pagesCount;
    let start = 0;
    // If the number of pages exceeds the max
    if (pagesCount > MAX_NUM_PAGES) {
      // Set number of pages to the max
      pages = MAX_NUM_PAGES;
      const half = Math.ceil(MAX_NUM_PAGES / 2);
      const isHead = currentPage <= half;
      const isTail = currentPage > pagesCount - half;
      hasNextDots = !isTail;
      // If the current page is at the head, the start variable remains 0
      if (!isHead) {
        hasPrevDots = true;
        // If the current page is at the tail, the start variable is set to
        // the last chunk. Otherwise the start variable will place the current
        // page at the middle
        start = isTail ? pagesCount - MAX_NUM_PAGES : currentPage - half;
      }
    }
    return [...new Array(pages)].map((_, i) => i + 1 + start);
  }

  const pages = getPages();

  return (
    <>
      <Helmet>
        {addCanonical && !hasPreviousPage && (
          <link rel="canonical" href={`${homepage}${basePath}`} />
        )}
        {hasPreviousPage && (
          <link rel="prev" href={`${homepage}${path}${currentPage - 1}`} />
        )}
        {hasNextPage && (
          <link rel="next" href={`${homepage}${path}${currentPage + 1}`} />
        )}
      </Helmet>

      <nav
        className={styles.nav}
        role="navigation"
        aria-label="Навігація сторінками"
      >
        {hasPreviousPage && (
          <Link
            className={styles.prev}
            href={`${path}${currentPage - 1}`}
            aria-label="Перейти на попередню сторінку"
          >
            <PreviousIcon /> <span>Попередня</span>
          </Link>
        )}

        <ul className={styles.pages}>
          {hasPrevDots && (
            <li className={styles.dots}>
              <Dots
                aria-label={`Навігація до сторінок 1-${pages[0] - 1} прихована`}
              />
            </li>
          )}
          {pages.map((page) => {
            const active = page === currentPage;
            return active ? (
              <li key={page}>
                <span
                  className={styles.active}
                  aria-label={`Поточна сторінка, Сторінка ${page}`}
                  aria-current="true"
                >
                  {page}
                </span>
              </li>
            ) : (
              <li key={page}>
                <Link
                  href={`${path}${page}`}
                  aria-label={`Перейти на сторінку ${page}`}
                >
                  <span>{page}</span>
                </Link>
              </li>
            );
          })}
          {hasNextDots && (
            <li className={styles.dots}>
              <Dots
                aria-label={`Навігація до сторінок ${
                  pages[pages.length - 1] + 1
                }-${pagesCount} прихована`}
              />
            </li>
          )}
        </ul>

        {hasNextPage && (
          <Link
            className={styles.next}
            href={`${path}${currentPage + 1}`}
            aria-label="Перейти на наступну сторінку"
          >
            <span>Наступна</span> <NextIcon />
          </Link>
        )}
      </nav>
    </>
  );
};

export default Pagination;
