import { Length, IsEmail } from "class-validator";
import { InputType } from "type-graphql";
import { Field } from "type-graphql";
import { PasswordInput } from "../shared/passwordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
