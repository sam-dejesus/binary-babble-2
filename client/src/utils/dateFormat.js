export const format_date = (date) => {
  console.log('Raw createdAt value:', date);

  const d = new Date(Number(date));

  // Check for invalid date
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }

  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${month}/${day}/${year} at ${hours}:${minutes}`;
};
