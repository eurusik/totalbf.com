import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function TwitterScript() {
  const router = useRouter();

  const initializeTwitterWidgets = useCallback(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setTimeout(initializeTwitterWidgets, 500);
    }
  }, [router.asPath, router.isReady, initializeTwitterWidgets]);

  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      )
    ) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      script.setAttribute('async', 'true');
      script.onload = () => {
        if (window.twttr) {
          window.twttr.widgets.load();
        }
      };
      document.head.appendChild(script);
    } else {
      if (window.twttr) {
        window.twttr.widgets.load();
      }
    }

    return () => {};
  }, []);

  return null;
}
