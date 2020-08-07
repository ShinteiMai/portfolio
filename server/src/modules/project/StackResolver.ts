import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Stack } from "../../entity/Stack";
import { getConnection } from "typeorm";

@Resolver()
export class ProjectResolver {
  @Mutation(() => Stack)
  async createStack(@Arg("name") name: string, @Arg("url") url: string) {
    const stack = Stack.create({ name, url });
    return await stack.save();
  }

  @Mutation(() => Boolean)
  async deleteStack(@Arg("id") id: string) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Stack)
        .where("id = :id", { id })
        .execute();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async updateStack(
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Arg("url") url: string
  ) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Stack)
        .set({ name, url })
        .where("id = :id", { id })
        .execute();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Query(() => [Stack])
  async getStacks() {
    return await Stack.find();
  }
}
