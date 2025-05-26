import { NextIntlClientProvider } from 'next-intl';

export function IntlProvider({ locale, messages, children }) {
  return (
    <NextIntlClientProvider
      locale={locale || 'uk'}
      messages={messages || {}}
      timeZone="Europe/Kiev"
      now={new Date()}
      onError={(error) => {
        console.error('NextIntl error:', error);
        return null;
      }}
      getMessageFallback={({ key }) => key}
    >
      {children}
    </NextIntlClientProvider>
  );
}

export default IntlProvider;
