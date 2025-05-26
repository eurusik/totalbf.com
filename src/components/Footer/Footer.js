import Link from 'next/link';

import useSite from 'hooks/use-site';
import Container from 'components/Container';
import footerLinks from 'config/footer-links';

import styles from './Footer.module.scss';

// Компонент інформації про авторів
const AuthorInfo = () => {
  return (
    <div className={styles.authorInfo}>
      <p>Надихалися темою SemiBlack</p>
      <p>
        Автори:{' '}
        <a
          href="https://github.com/eurusik"
          target="_blank"
          rel="noopener noreferrer"
        >
          EuRusik
        </a>{' '}
        та{' '}
        <a
          href="https://github.com/Mo45"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mo45
        </a>
      </p>
      <p>
        Нащадок легендарного{' '}
        <a
          href="https://web.archive.org/web/20160304044039/http://bf3.com.ua/"
          target="_blank"
          rel="noopener noreferrer"
        >
          BF3.com.ua
        </a>
      </p>
    </div>
  );
};

// Компонент копірайту
const Copyright = ({ title }) => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.copyright}>
      <p>
        © 2011 - {year} {title} | зроблено з ❤️,
      </p>
    </div>
  );
};

// Компонент навігації
const Navigation = () => {
  const navigationLabels = {
    'navigation.home': 'Головна',
    'navigation.news': 'Новини',
    'navigation.categories': 'Категорії',
    'navigation.rss': 'RSS',
    'navigation.sitemap': 'Карта сайту',
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.flex}>
        {Object.entries(footerLinks).map(([key, link]) => {
          return link.external ? (
            <a key={key} href={link.url}>
              {navigationLabels[link.translationKey] || link.translationKey}
            </a>
          ) : (
            <Link key={key} href={link.url}>
              {navigationLabels[link.translationKey] || link.translationKey}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Головний компонент футера
const Footer = () => {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={`${styles.footerGrid} ${styles.footerFont}`}>
          <AuthorInfo />
          <Copyright title={title} />
          <Navigation />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
