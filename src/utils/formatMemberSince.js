export function formatMemberSince(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month}-${year}`;
}
