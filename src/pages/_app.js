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
import Script from 'next/script';
import TwitterScript from 'components/TwitterScript';

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
          <TwitterScript />
          {siteConfig.analytics.enabled && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
              />
              <Script
                id="ga-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${siteConfig.analytics.googleAnalyticsId}');
                  `,
                }}
              />
            </>
          )}
        </div>
      </SearchProvider>
    </SiteContext.Provider>
  );
}

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
    revalidate: 60,
  };
}

export default App;
