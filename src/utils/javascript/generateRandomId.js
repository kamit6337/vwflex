const generateRandomId = (loop = 16) => {
  let randomId = "";

  for (let index = 1; index <= loop; index++) {
    const singleNumber = Math.floor(Math.random() * 10);

    randomId += String(singleNumber);
  }

  return Number(randomId);
};

export default generateRandomId;
