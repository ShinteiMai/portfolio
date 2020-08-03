import { redis } from "../redis";
import { v4 as uuid } from "uuid";

export const createConfirmationUrl = async (userId: string) => {
  const id = uuid();
  await redis.set(id, userId, "ex", 60 * 60 * 24); // 1 day expiration date.

  return `http://localhost:3000/user/confirm/${id}`;
};
