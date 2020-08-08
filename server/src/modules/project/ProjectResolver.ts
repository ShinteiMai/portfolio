import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { LinkInput } from "./Inputs/LinkInput";
import { Project } from "../../entity/Project";
import { Stack } from "../../entity/Stack";
import { Link } from "../../entity/Link";

export const validateStacks = async (
  stackIds: string[]
): Promise<Stack[] | null> => {
  const projectStacks: Stack[] = [];
  for await (let id of stackIds) {
    const validateStack = await Stack.findOne(id);
    if (!validateStack) {
      return null;
    }
    projectStacks.push(validateStack);
  }
  return projectStacks;
};

@Resolver()
export class ProjectResolver {
  @Mutation(() => Project, { nullable: true })
  async createProject(
    @Arg("title") title: string,
    @Arg("year") year: string,
    @Arg("stacks", () => [String]) stacks: string[],
    @Arg("links", () => [LinkInput]) links: LinkInput[]
  ): Promise<Project | null> {
    try {
      const projectStacks = await validateStacks(stacks);
      console.log(projectStacks);
      if (projectStacks != null) {
        const project = await Project.create({
          title,
          year,
          stacks: projectStacks,
        });
        await project.save();

        for await (let link of links) {
          await Link.create({ ...link, project }).save();
        }

        return project;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Project, { nullable: true })
  async deleteProject(@Arg("id") id: string): Promise<Project | null> {
    try {
      const project = await Project.findOne(id, { relations: ["stacks"] });
      if (project) {
        const links = await project.links();

        for await (let link of links) {
          await link.remove();
        }

        await project.remove();

        return project;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("year") year: string,
    @Arg("stacks", () => [String]) stacks: string[],
    @Arg("links", () => [LinkInput]) links: LinkInput[]
  ): Promise<Project | null> {
    const projectStacks = await validateStacks(stacks);
    if (projectStacks) {
      const project = await Project.findOne(id, { relations: ["stacks"] });
      console.log(project);
      if (project) {
        const projectLinks = await project.links();

        project.title = title;
        project.year = year;
        project.stacks = projectStacks;

        await project.save();

        for await (let link of projectLinks) {
          await Link.remove(link);
        }

        for await (let link of links) {
          await Link.create({ ...link, project }).save();
        }

        return project;
      } else {
        return null;
      }
    }
    return null;
  }

  @Query(() => [Project], { nullable: true })
  async getProjects(): Promise<Project[] | null> {
    const projects = await Project.find({ relations: ["stacks"] });
    console.log(projects);
    if (projects) {
      return projects;
    } else {
      return null;
    }
  }

  @Query(() => Project, { nullable: true })
  async getProject(@Arg("id") id: string): Promise<Project | null> {
    const project = await Project.findOne(id, { relations: ["stacks"] });
    if (project) {
      return project;
    } else {
      return null;
    }
  }
}
