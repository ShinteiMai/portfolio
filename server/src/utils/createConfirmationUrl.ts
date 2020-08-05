import { redis } from "../redis";
import { v4 as uuid } from "uuid";
import { confirmUserPrefix } from "../constants/confirmationPrefix";

export const createConfirmationUrl = async (userId: string) => {
  const id = uuid();
  await redis.set(confirmUserPrefix + id, userId, "ex", 60 * 60 * 24); // 1 day expiration date.

  return `http://localhost:3000/users/confirm/${id}`;
};
