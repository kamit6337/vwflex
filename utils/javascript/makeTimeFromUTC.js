const makeTimeFromUTC = (UTCdate) => {
  const shortMonthsList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const modifyDate = new Date(UTCdate);

  const year = modifyDate.getFullYear();
  const month = modifyDate.getMonth();
  const date = modifyDate.getDate();

  return `${date} ${shortMonthsList[month]} ${year}`;
};

export default makeTimeFromUTC;
