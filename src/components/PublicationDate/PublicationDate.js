import { formatRelativeTime } from 'lib/datetime';

const PublicationDate = ({ date }) => {
  const dateTimeLabels = {
    publicationDate: 'Дата публікації:',
    justNow: 'щойно',
    yesterday: 'вчора',
    ago: 'тому',
    day: 'день',
    days: 'дні',
    manyDays: 'днів',
    hour: 'година',
    hours: 'години',
    manyHours: 'годин',
    minute: 'хвилина',
    minutes: 'хвилини',
    manyMinutes: 'хвилин',
    second: 'секунда',
    seconds: 'секунди',
    manySeconds: 'секунд',
  };

  return (
    <time pubdate="pubdate" dateTime={date}>
      {dateTimeLabels.publicationDate}{' '}
      {formatRelativeTime(
        date,
        {
          justNow: dateTimeLabels.justNow,
          yesterday: dateTimeLabels.yesterday,
          ago: dateTimeLabels.ago,
          day: dateTimeLabels.day,
          days: dateTimeLabels.days,
          manyDays: dateTimeLabels.manyDays,
          hour: dateTimeLabels.hour,
          hours: dateTimeLabels.hours,
          manyHours: dateTimeLabels.manyHours,
          minute: dateTimeLabels.minute,
          minutes: dateTimeLabels.minutes,
          manyMinutes: dateTimeLabels.manyMinutes,
          second: dateTimeLabels.second,
          seconds: dateTimeLabels.seconds,
          manySeconds: dateTimeLabels.manySeconds,
        },
        'uk-UA'
      )}
    </time>
  );
};

export default PublicationDate;
