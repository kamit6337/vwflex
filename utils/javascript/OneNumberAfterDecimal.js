const OneNumberAfterDecimal = (num, afterDecimal = 1) => {
  if (!num) return null;

  //   return parseFloat(num.toFixed(afterDecimal));

  const roundedNum = Math.round(num * 10) / 10;
  return roundedNum % 1 === 0
    ? roundedNum.toString() + ".0"
    : roundedNum.toString();
};

export default OneNumberAfterDecimal;
