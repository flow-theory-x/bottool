import { CONST } from "./common/const.js";
import { configure } from "@vendia/serverless-express";
import controller from "./controller/controller.js";
import express from "express";
import {
  verifyKeyMiddleware,
  InteractionType,
  InteractionResponseType,
} from "discord-interactions";

if (CONST.API_ENV == undefined) {
  console.log("BotTools SETTING ERROR");
  process.exit(1);
}
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get("/", async (_, res) => {
  const result =
    "<h1>" +
    CONST.API_NAME +
    " ver." +
    CONST.VERSION +
    " [" +
    CONST.DEPLOY_DATETIME +
    "]</h1>";
  res.send(result);
});

app.get("/sendMember/:id/:mes", async (req, res) => {
  const message = "sendMessage for member:";
  await controller.sqsSend({
    function: "discord-direct-message",
    params: {
      message: req.params.mes,
      userId: req.params.id,
    },
  });
  res.send({ message: message + req.params.mes + " to " + req.params.id });
});

app.post(
  "/interactions",
  verifyKeyMiddleware(CONST.DISCORD_PUB_KEY),
  async (req, res) => {
    const message = req.body;

    // pingに対する返答
    if (message === 1) {
      return res.send({ type: 1 });
    }

    if (message.type === InteractionType.APPLICATION_COMMAND) {
      console.log("slash command request" + JSON.stringify(message));

      //=============================================================
      if (message.data.name === "gm") {
        await controller.sqsSend({
          function: "discord-message",
          params: {
            message:
              message.member.user.global_name + "さん。おはようございます。",
            channelId: message.channel_id,
          },
        });
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "good morning mr." + message.member.user.global_name,
            flags: 64,
          },
        });
      }
    }
  }
);

if (process.env.NODE_ENV === `develop`) app.listen(8080);

const server = configure({ app });
export const handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return server(event, context);
};
