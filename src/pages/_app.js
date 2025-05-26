import NextApp from 'next/app';
import { useRouter } from 'next/router';

import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';
import IntlProvider from 'providers/IntlProvider';

import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getCategories } from 'lib/categories';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus } from 'lib/menus';
import { inter, roboto } from 'lib/fonts';

import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';

function App({ Component, pageProps = {}, metadata, recentPosts, categories, menus }) {
  const router = useRouter();
  const locale = router.locale || 'uk';
  // Load messages for the current locale
  let messages;
  try {
    messages = {
      header: require(`../messages/${locale}/header.json`),
      footer: require(`../messages/${locale}/footer.json`),
    };
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    messages = {
      header: require('../messages/uk/header.json'),
      footer: require('../messages/uk/footer.json'),
    };
  }

  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
  });

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SiteContext.Provider value={site}>
        <SearchProvider>
          <div className={`${inter.variable} ${roboto.variable}`}>
            <NextNProgress height={4} color={variables.progressbarColor} />
            <Component {...pageProps} />
          </div>
        </SearchProvider>
      </SiteContext.Provider>
    </IntlProvider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'index',
  });

  const { categories } = await getCategories({
    count: 5,
  });

  const { menus = [] } = await getAllMenus();

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    menus,
  };
};

export default App;
