// Format the date to a string
function formatDate(date: Date, locale?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(locale, options);
}

export { formatDate };
