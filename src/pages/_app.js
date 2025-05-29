import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';
import siteConfig from 'config/site-config';

import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getCategories } from 'lib/categories';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus } from 'lib/menus';
import { inter, roboto, bebasNeue } from 'lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';

function App({
  Component,
  pageProps = {},
  metadata,
  recentPosts,
  categories,
  menus,
}) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
    homepage: siteConfig.siteUrl,
  });

  return (
    <SiteContext.Provider value={site}>
      <SearchProvider>
        <div
          className={`${inter.variable} ${roboto.variable} ${bebasNeue.variable}`}
        >
          <NextNProgress height={4} color={variables.progressbarColor} />
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </div>
      </SearchProvider>
    </SiteContext.Provider>
  );
}

// Використовуємо getStaticProps замість getInitialProps
export async function getStaticProps() {
  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'index',
  });

  const { categories } = await getCategories({
    count: 5,
  });

  const { menus = [] } = await getAllMenus();
  const metadata = await getSiteMetadata();

  return {
    props: {
      metadata,
      recentPosts,
      categories,
      menus,
    },
    // Оновлюємо дані кожну хвилину
    revalidate: 60,
  };
}

export default App;
