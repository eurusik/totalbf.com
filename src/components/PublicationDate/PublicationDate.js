const PublicationDate = ({ date }) => {
  const publicationDateLabel = 'Дата публікації:';

  const getStaticDateFormat = (dateString) => {
    try {
      const d = new Date(dateString);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    } catch (e) {
      return '';
    }
  };

  const staticDate = getStaticDateFormat(date);

  return (
    <time pubdate="pubdate" dateTime={date}>
      {publicationDateLabel} {staticDate}
    </time>
  );
};

export default PublicationDate;
