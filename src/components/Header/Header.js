import { MessageSquare, Twitter } from 'lucide-react';
import { GiShotgunRounds } from 'react-icons/gi';
import socialLinks from 'config/social-links';
import Link from 'next/link';
import Search from 'components/Search';

import styles from './Header.module.scss';

function TwitterIcon() {
  return (
    <a
      href={socialLinks.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialIcon}
    >
      <Twitter className={styles.iconSvg} />
    </a>
  );
}

function SearchIcon() {
  return (
    <div className={styles.socialIcon}>
      <Search />
    </div>
  );
}

function DiscordIcon() {
  return (
    <a
      href={socialLinks.discord}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialIcon}
    >
      <MessageSquare className={styles.iconSvg} />
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
      <GiShotgunRounds className={styles.swordsIcon} />
    </div>
  );
}

function Title() {
  return (
    <div className={styles.titleContainer}>
      <Link href="/" className={styles.title}>
        TotalBF
      </Link>
      <sup className={styles.version}>1.0</sup>
      <span className={styles.slogan}> — Твоє поле битви</span>
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
