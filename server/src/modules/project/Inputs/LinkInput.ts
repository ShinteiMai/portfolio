import { Field, InputType } from "type-graphql";

@InputType()
export class LinkInput {
  @Field()
  type: string;

  @Field()
  url: string;
}
