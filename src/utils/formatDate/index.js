export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleString("en-IN", options);
};
