const environment = {
  NODE_ENV: process.env.NODE_ENV,
  SERVER_URL: process.env.SERVER_URL,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
  THIRD_PARTY_URL: process.env.THIRD_PARTY_URL,
  THIRD_PARTY_URL_ACCESS_TOKEN: process.env.THIRD_PARTY_URL_ACCESS_TOKEN,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MY_GMAIL_PASSWORD: process.env.MY_GMAIL_PASSWORD,
  MY_GMAIL_ID: process.env.MY_GMAIL_ID,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  SALT_ROUND: Number(process.env.SALT_ROUND),
};

export default environment;
