import { User } from "../../entity/User";
import bcrypt from "bcryptjs";

export const createBaseUser = async () => {
  const users = await User.find();
  if (users.length === 0) {
    if (process.env.USERNAME && process.env.PASSWORD) {
      const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 12);

      const newUser = await User.create({
        username: process.env.USERNAME,
        password: hashedPassword,
      });
      await User.save(newUser);
      console.log(`[Auth] Created new user: ${process.env.USERNAME}`);
    } else {
      console.log("[Auth] You didn't specify the base user in the .env file");
    }
  } else {
    console.log("[Auth] Base user already exists");
  }
};
