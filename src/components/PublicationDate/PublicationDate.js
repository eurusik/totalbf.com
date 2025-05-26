import { useLocale, useTranslations } from 'next-intl';
import { formatRelativeTime } from 'lib/datetime';

const PublicationDate = ({ date }) => {
  const locale = useLocale();
  const t = useTranslations('dateTime');

  return (
    <time pubdate="pubdate" dateTime={date}>
      {t('publicationDate')}{' '}
      {formatRelativeTime(
        date,
        {
          justNow: t('justNow'),
          yesterday: t('yesterday'),
          ago: t('ago'),
          day: t('day'),
          days: t('days'),
          manyDays: t('manyDays'),
          hour: t('hour'),
          hours: t('hours'),
          manyHours: t('manyHours'),
          minute: t('minute'),
          minutes: t('minutes'),
          manyMinutes: t('manyMinutes'),
          second: t('second'),
          seconds: t('seconds'),
          manySeconds: t('manySeconds'),
        },
        locale === 'uk' ? 'uk-UA' : 'en-US'
      )}
    </time>
  );
};

export default PublicationDate;
