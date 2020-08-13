import Layout from "../../components/Layout";
import { ApolloContext } from "../../interfaces/ApolloContext";
import {
  MeQuery,
  MeQueryVariables,
  GetProjectQuery,
  GetProjectQueryVariables,
  Project,
  DeleteProjectComponent,
  DeleteImageComponent,
} from "../../generated/apolloComponents";
import { meQuery } from "../../graphql/user/queries/me";
import redirect from "../../lib/redirect";
import { getProject } from "../../graphql/user/queries/getProject";
import {
  Text,
  Flex,
  List,
  ListItem,
  Link,
  Icon,
  Box,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/core";
import { GoTrashcan } from "react-icons/go";
import { GrUpdate } from "react-icons/gr";
import { default as NextLink } from "next/link";

type Props = {
  project: Project;
};

const ProjectComponent = ({ project }: Props) => {
  return (
    <Layout>
      <Box>
        <Box w="75%" mx="auto" my={4}>
          <Image src={project.image.url} alt={project.image.filename} />
        </Box>

        <Box w="75%" mx="auto">
          <Text fontSize={["2xl", "4xl"]}>{project.title}</Text>
          <Text fontSize={["1xl", "2xl"]}>{project.year}</Text>
          <Flex flexDirection="column" my={6}>
            <Text fontSize="2xl">Stacks</Text>
            <List spacing={2}>
              {project.stacks.map((stack) => {
                return (
                  <ListItem key={stack.id}>
                    <Link href={stack.url} isExternal>
                      <Icon name="external-link" mx="4px" />
                      {stack.name}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Flex>
          <Flex flexDirection="column" my={6}>
            <Text fontSize="2xl">Links</Text>
            <List spacing={2}>
              {project.links.map((link) => (
                <ListItem key={link.id}>
                  <Link href={link.url} isExternal>
                    <Icon name="external-link" mx="4px" />
                    {link.type}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Flex>
          <ButtonGroup spacing={4} my={8}>
            <Button leftIcon={GrUpdate} variantColor="teal">
              Update Project
            </Button>

            <DeleteProjectComponent>
              {(deleteProject) => (
                <DeleteImageComponent>
                  {(deleteImage) => (
                    <Button
                      leftIcon={GoTrashcan}
                      variantColor="pink"
                      onClick={async () => {
                        try {
                          const imageResponse = await deleteImage({
                            variables: {
                              id: project.image.id,
                            },
                          });
                          if (imageResponse.data) {
                            const projectResponse = await deleteProject({
                              variables: {
                                id: project.id,
                              },
                            });
                            console.log(projectResponse);
                          }
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      Delete Project
                    </Button>
                  )}
                </DeleteImageComponent>
              )}
            </DeleteProjectComponent>
          </ButtonGroup>
          <Box>
            <Button variantColor="yellow">
              <NextLink href="/admin">
                <Link>Go Back</Link>
              </NextLink>
            </Button>
          </Box>
        </Box>
      </Box>
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
