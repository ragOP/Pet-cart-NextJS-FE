export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-IN", options);
}
