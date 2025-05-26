'use client';

import { NextIntlClientProvider } from 'next-intl';

export function IntlProvider({ locale, messages, children }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default IntlProvider;
