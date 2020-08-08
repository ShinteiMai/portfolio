import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Link extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @PrimaryColumn()
  projectId: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  url: string;

  @ManyToOne(() => Project, (project) => project.linksConnection)
  project: Project;
}
