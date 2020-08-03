import { Field, InputType } from "type-graphql";
import { PasswordMixin } from "../shared/passwordInput";

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token: string;

  @Field()
  password: string;
}
