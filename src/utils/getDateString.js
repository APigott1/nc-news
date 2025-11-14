export default (object = {}) => {
  let createdAt = new Date();
  if (Object.keys(object).length > 0) {
    createdAt = new Date(object.created_at);
  }
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return createdAt.toLocaleDateString(undefined, options);
};
