import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Link } from "../../entity/Link";
import { getConnection } from "typeorm";

@Resolver()
export class ProjectResolver {
  @Mutation(() => Link)
  async createLink(@Arg("type") type: string, @Arg("url") url: string) {
    const link = Link.create({ type, url });
    return await link.save();
  }

  @Mutation(() => Boolean)
  async deleteLink(@Arg("id") id: string) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Link)
        .where("id = :id", { id })
        .execute();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateLink(
    @Arg("id") id: string,
    @Arg("type") type: string,
    @Arg("url") url: string
  ) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Link)
        .set({ type, url })
        .where("id = :id", { id })
        .execute();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Query(() => [Link])
  async getLinks() {
    return await Link.find();
  }
}
