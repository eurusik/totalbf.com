import { useState, useEffect } from 'react';
import { formatDate } from 'lib/datetime';

const PublicationDate = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState('');

  const publicationDateLabel = 'Дата публікації:';

  useEffect(() => {
    setFormattedDate(formatDate(date));
  }, [date]);

  return (
    <time pubdate="pubdate" dateTime={date}>
      {publicationDateLabel} {formattedDate}
    </time>
  );
};

export default PublicationDate;
