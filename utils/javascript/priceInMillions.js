const priceInMillions = (money) => {
  if (!money) return null;

  const convertToMillions = Math.floor(Number(money) / 1000000);

  if (convertToMillions < 1) {
    return "No data yet";
  }

  // 2054 millions
  const convertToString = String(convertToMillions);

  if (convertToString.length >= 4) {
    const first = convertToString[0];
    const second = convertToString[1];

    const makeString = `${first}.${second} Billions`;

    return makeString;
  }

  return `${convertToMillions} Millions`;
};

export default priceInMillions;
