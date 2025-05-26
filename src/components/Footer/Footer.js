import Link from 'next/link';
import { useTranslations } from 'next-intl';

import useSite from 'hooks/use-site';
import Container from 'components/Container';
import footerLinks from 'config/footer-links';

import styles from './Footer.module.scss';

// Компонент інформації про авторів
const AuthorInfo = () => {
  const t = useTranslations('footer');
  return (
    <div className={styles.authorInfo}>
      <p>{t('authorInfo.inspired')}</p>
      <p>
        {t.rich('authorInfo.authors', {
          eurusik: (chunks) => (
            <a
              href="https://github.com/eurusik"
              target="_blank"
              rel="noopener noreferrer"
            >
              {chunks}
            </a>
          ),
          mo45: (chunks) => (
            <a
              href="https://github.com/Mo45"
              target="_blank"
              rel="noopener noreferrer"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
      <p>
        {t.rich('authorInfo.legacy', {
          a: (chunks) => (
            <a
              href="https://bf3.com.ua"
              target="_blank"
              rel="noopener noreferrer"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
};

// Компонент копірайту
const Copyright = ({ title }) => {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  return (
    <div className={styles.copyright}>
      <p>
        {t.rich('copyright.text', {
          year,
          title,
        })}
      </p>
    </div>
  );
};

// Компонент навігації
const Navigation = () => {
  const t = useTranslations('footer');
  return (
    <div className={styles.navigation}>
      <div className={styles.flex}>
        {Object.entries(footerLinks).map(([key, link]) => {
          return link.external ? (
            <a key={key} href={link.url}>
              {t(link.translationKey)}
            </a>
          ) : (
            <Link key={key} href={link.url}>
              {t(link.translationKey)}
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
