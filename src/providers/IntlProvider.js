import { NextIntlClientProvider } from 'next-intl';

export function IntlProvider({ locale, messages, children }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Kiev" now={new Date()}>
      {children}
    </NextIntlClientProvider>
  );
}

export default IntlProvider;
