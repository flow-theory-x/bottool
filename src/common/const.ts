import dotenv from "dotenv";
dotenv.config();

export const CONST = {
  VERSION: process.env.VERSION,
  DEPLOY_DATETIME: process.env.DEPLOY_DATETIME,

  API_ENV: process.env.API_ENV,
  API_NAME: process.env.API_NAME,
  API_URL: process.env.API_URL,
  SERVER_INFO: process.env.SERVER_INFO,
  SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,

  DISCORD_API_ID: process.env.DISCORD_API_ID,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_BOT_KEY: process.env.DISCORD_BOT_KEY,
  DISCORD_PUB_KEY: process.env.DISCORD_PUB_KEY,
  DISCORD_ADMIN_USER_ID: process.env.DISCORD_ADMIN_USER_ID,

  DYNAMO_REGION: process.env.DYNAMO_REGION,
  DYNAMO_TABLE_PREFIX: process.env.DYNAMO_TABLE_PREFIX,
  DYNAMO_SOFT_DELETE: process.env.DYNAMO_SOFT_DELETE,
  DYNAMO_WRITE_WAIT_TIME: 200,

  RETRY_WAIT: 500,
  RETRY_LIMIT: 2,
  roles: {},
};
