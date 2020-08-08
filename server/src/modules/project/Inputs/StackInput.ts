import { InputType, Field } from "type-graphql";

@InputType()
export class StackInput {
  @Field()
  name: string;

  @Field()
  url: string;
}
