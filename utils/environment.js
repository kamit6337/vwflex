const environment = {
  SERVER_URL: process.env.SERVER_URL,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
  THIRD_PARTY_URL: process.env.THIRD_PARTY_URL,
  THIRD_PARTY_URL_ACCESS_TOKEN: process.env.THIRD_PARTY_URL_ACCESS_TOKEN,
  SALT_ROUND: Number(process.env.SALT_ROUND),
};

export default environment;
