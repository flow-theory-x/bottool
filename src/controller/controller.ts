import sqsService from "../service/sqs.js";
import { Message } from "../types/message.js";

const sqsSend = async (message: Message) => {
  const result = await sqsService.sendMessage(JSON.stringify(message));
  return result;
};

const controller = {
  sqsSend,
};

export default controller;
