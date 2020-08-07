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

  @OneToMany(() => Stack, (stack) => stack.project)
  stacks: Stack[];

  @OneToMany(() => Link, (link) => link.project)
  links: Link[];
}
