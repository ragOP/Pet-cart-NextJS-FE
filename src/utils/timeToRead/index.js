export const timeToRead = (text) => {
  const words = text.split(" ").length;
  const minutes = Math.ceil(words / 100);
  return `${minutes} minute read`;
};
