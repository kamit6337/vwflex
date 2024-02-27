const IndianTypeDate = (date) => {
  if (!date) return null;

  return date.split("-").reverse().join("-");
};

export default IndianTypeDate;
