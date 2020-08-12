import Layout from "../../components/Layout";
import { ApolloContext } from "../../interfaces/ApolloContext";
import {
  MeQuery,
  MeQueryVariables,
  GetProjectQuery,
  GetProjectQueryVariables,
  Project,
} from "../../generated/apolloComponents";
import { meQuery } from "../../graphql/user/queries/me";
import redirect from "../../lib/redirect";
import { getProject } from "../../graphql/user/queries/getProject";

type Props = {
  project: Project;
};

const ProjectComponent = ({ project }: Props) => {
  return (
    <Layout>
      <div>
        <h1>{project.title}</h1>
        <h3>{project.year}</h3>
        <div>
          <h3>Stacks</h3>
          <ul>
            {project.stacks.map((stack) => (
              <li key={stack.id}>
                <a href={stack.url}>{stack.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Links</h3>
          <ul>
            {project.links.map((link) => (
              <li key={link.id}>
                <a href={link.url}>{link.type}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src={project.image.url} alt={project.image.filename} />
        </div>
        <div />
      </div>
    </Layout>
  );
};

ProjectComponent.getInitialProps = async ({
  query: { projectId },
  apolloClient,
  ...ctx
}: ApolloContext) => {
  const validate = await apolloClient.query<MeQuery, MeQueryVariables>({
    query: meQuery,
  });
  if (!validate.data.me) redirect(ctx, "/");

  try {
    const project = await apolloClient.query<
      GetProjectQuery,
      GetProjectQueryVariables
    >({
      query: getProject,
      variables: {
        id: projectId as any,
      },
    });
    if (project.data.getProject) {
      return {
        project: project.data.getProject,
      };
    }
    redirect(ctx, "/");
    return {};
  } catch (err) {
    console.log(err);
    redirect(ctx, "/");
    return {};
  }
};

export default ProjectComponent;
