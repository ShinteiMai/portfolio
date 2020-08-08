import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @Field(() => [Link])
  async links() {
    return await Link.find({
      relations: ["project"],
      where: {
        projectId: this.id,
      },
    });
  }

  @Field(() => [Stack])
  @ManyToMany(() => Stack)
  @JoinTable()
  stacks: Stack[];

  @OneToMany(() => Link, (linkConnection) => linkConnection.project)
  linksConnection: Link[];
}
