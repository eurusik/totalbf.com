import { Search, Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SiDiscord, SiX } from '@icons-pack/react-simple-icons';
import socialLinks from 'config/social-links';
import Link from 'next/link';

import styles from './Header.module.scss';

function TwitterIcon() {
  return (
    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
      <SiX className={styles.iconSvg} />
    </a>
  );
}

function SearchIcon() {
  return (
    <a href={socialLinks.search} className={styles.socialIcon}>
      <Search className={styles.iconSvg} />
    </a>
  );
}

function DiscordIcon() {
  return (
    <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
      <SiDiscord className={styles.iconSvg} />
    </a>
  );
}

function SocialIcons() {
  return (
    <div className={styles.socialIcons}>
      <SearchIcon />
      <TwitterIcon />
      <DiscordIcon />
    </div>
  );
}

function Logo() {
  return (
    <div className={styles.logoIcon}>
      <Swords className={styles.swordsIcon} />
    </div>
  );
}

function Title() {
  const t = useTranslations();

  return (
    <div className={styles.titleContainer}>
      <Link href="/" className={styles.title}>
        {t('header.title')}
      </Link>
      <sup className={styles.version}>{t('header.version')}</sup>
      <span className={styles.slogan}> — {t('header.slogan')}</span>
    </div>
  );
}

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Logo />
            <Title />
          </div>

          <SocialIcons />
        </div>

        <div className={styles.bottomLine}></div>
      </div>
    </header>
  );
};

export default Header;
