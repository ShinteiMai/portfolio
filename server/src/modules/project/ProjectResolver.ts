import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { StackInput } from "./Inputs/StackInput";
import { LinkInput } from "./Inputs/LinkInput";
import { Project } from "../../entity/Project";
import { Stack } from "../../entity/Stack";
import { Link } from "../../entity/Link";
@Resolver()
export class ProjectResolver {
  @Mutation(() => Project, { nullable: false })
  async createProject(
    @Arg("title") title: string,
    @Arg("year") year: string,
    @Arg("stacks", () => [StackInput]) stacks: StackInput[],
    @Arg("links", () => [LinkInput]) links: LinkInput[]
  ): Promise<Project | null> {
    try {
      const project = await Project.create({ title, year });

      stacks.forEach(async (stack) => {
        const newStack = await Stack.create({ ...stack });
        newStack.project = project;
        await newStack.save();
      });

      links.forEach(async (link) => {
        const newLink = await Link.create({ ...link });
        newLink.project = project;
        await newLink.save();
      });
      await Project.save(project);
      return project;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Project, { nullable: true })
  async deleteProject(@Arg("id") id: string): Promise<Project | null> {
    try {
      const project = await Project.findOne(id);
      if (project) {
        const stacks = await project.stacks();
        const links = await project.links();
        stacks.forEach(async (stack) => {
          await Stack.remove(stack);
        });
        links.forEach(async (link) => {
          await Link.remove(link);
        });
        await Project.remove(project);
        console.log(project);
        return project;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  // @Mutation(() => Project, { nullable: true })
  // async updateProject(
  //   @Arg("id") id: string,
  //   @Arg("title") title: string,
  //   @Arg("year") year: string,
  //   @Arg("stacks", () => [StackInput]) stacks: StackInput[],
  //   @Arg("links", () => [LinkInput]) links: LinkInput[]
  // ): Promise<Project | null> {
  //   try {
  //     const project = Project.findOne(id);
  //     if (project) {
  //       const updatedProject = {
  //         ...project,
  //         title,
  //         year,
  //       };
  //       const stacks = await project.stacks();
  //     }
  //   } catch (err) {
  //     return null;
  //   }
  // }

  @Query(() => [Project], { nullable: true })
  async getProjects(): Promise<Project[] | null> {
    const projects = await Project.find();
    if (projects) {
      return projects;
    } else {
      return null;
    }
  }

  @Query(() => Project, { nullable: true })
  async getProject(@Arg("id") id: string): Promise<Project | null> {
    const project = await Project.findOne(id);
    if (project) {
      return project;
    } else {
      return null;
    }
  }

  @Query(() => String)
  async helloWorld() {
    return "hello world!";
  }
}
