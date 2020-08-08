import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Stack extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @PrimaryColumn()
  projectId: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  url: string;

  @ManyToOne(() => Project, (project) => project.stacksConnection)
  project: Project;
}
