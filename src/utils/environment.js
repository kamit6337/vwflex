const environment = {
  SERVER_URL: process.env.SERVER_URL,
  THIRD_PARTY_URL: process.env.THIRD_PARTY_URL,
  THIRD_PARTY_URL_ACCESS_TOKEN: process.env.THIRD_PARTY_URL_ACCESS_TOKEN,
  SALT_ROUND: Number(process.env.SALT_ROUND),
};

export default environment;
