import { Resolver, Query } from "type-graphql";
@Resolver()
export class ProjectResolver {
  @Query(() => String)
  async helloWorld() {
    return "hello world!";
  }
}
