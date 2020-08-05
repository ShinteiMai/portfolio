import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 as uuid } from "uuid";
import { redis } from "../../redis";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../../entity/User";
import { forgotPasswordPrefix } from "../../constants/confirmationPrefix";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return true;

    const token = uuid();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);

    await sendEmail(
      email,
      `http://localhost:3000/users/change-password/${token}`
    );

    return true;
  }
}
