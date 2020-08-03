import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../shared/passwordInput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;

  @Field()
  password: string;
}
