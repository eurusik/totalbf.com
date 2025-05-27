import { useCallback, useEffect, useRef, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';

import { postPathBySlug } from 'lib/posts';
import useSearch from 'hooks/use-search';

import styles from './Search.module.scss';

function Search() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const formRef = useRef(null);
  const { results, search, clearSearch } = useSearch({ maxResults: 5 });

  const handleClickOutside = useCallback(
    (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setSearchVisible(false);
        setQuery('');
        clearSearch();
      }
    },
    [clearSearch]
  );

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setSearchVisible(false);
        setQuery('');
        clearSearch();
      }
    },
    [clearSearch]
  );

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      // Reset search when opening
      setQuery('');
      clearSearch();
    }
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) {
      search({ query: newQuery });
    } else {
      clearSearch();
    }
  };

  useEffect(() => {
    if (searchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [searchVisible, handleClickOutside, handleEscapeKey, clearSearch]);

  return (
    <div className={styles.searchContainer}>
      <button onClick={toggleSearch} className={styles.searchButton}>
        <SearchIcon className={styles.searchIcon} />
      </button>
      {searchVisible && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchModal} ref={formRef}>
            <div className={styles.searchHeader}>
              <h2>Пошук</h2>
              <button
                type="button"
                onClick={toggleSearch}
                className={styles.closeButton}
                aria-label="Закрити пошук"
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.searchFormContainer}>
              <div className={styles.inputWrapper}>
                <SearchIcon className={styles.inputIcon} size={18} />
                <input
                  type="search"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Пошук статей..."
                  aria-label="Пошук"
                  autoFocus
                />
              </div>
              {query.length > 2 && (
                <div className={styles.searchResults}>
                  {results.length > 0 ? (
                    <>
                      <h3>Результати для &quot;{query}&quot;</h3>
                      <ul>
                        {results.map((result) => {
                          const slug = result.slug;
                          const path = postPathBySlug(slug);
                          return (
                            <li key={path}>
                              <Link href={path} onClick={toggleSearch}>
                                {result.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <div className={styles.noResults}>
                      <p>
                        Нічого не знайдено для <strong>{query}</strong>
                      </p>
                      <p>Спробуйте інші ключові слова або перевірте правопис</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
