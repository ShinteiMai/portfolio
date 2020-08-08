import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Link } from "./Link";
import { Stack } from "./Stack";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  year: string;

  @Field(() => [Stack])
  async stacks() {
    return await Stack.find({
      relations: ["project"],
      where: {
        projectId: this.id,
      },
    });
  }

  @Field(() => [Link])
  async links() {
    return await Link.find({
      relations: ["project"],
      where: {
        projectId: this.id,
      },
    });
  }

  @OneToMany(() => Stack, (stackConnection) => stackConnection.project)
  stacksConnection: Stack[];

  @OneToMany(() => Link, (linkConnection) => linkConnection.project)
  linksConnection: Link[];
}
