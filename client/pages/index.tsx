import Layout from "../components/Layout";
import { Box, Heading, Text, Button } from "@chakra-ui/core";

const IndexPage = () => (
  <Layout title="Steven Hansel">
    <Box>
      <Text marginLeft={2} marginBottom={4} fontSize="lg">
        What's up! my name is
      </Text>
      <Heading fontSize="5xl" marginBottom={3}>
        Steven Hansel
      </Heading>
      <Heading fontSize="4xl">
        Building robust software is my expertise.
      </Heading>
      <Text width="70%" marginY={6}>
        I'm a software engineer based in Jakarta, Indonesia specializing in
        building exceptional applications ranging in website, mobile, and
        desktop applications.
      </Text>
      <Button paddingX={4} paddingY={6}>
        Get in Touch
      </Button>
    </Box>
  </Layout>
);

export default IndexPage;
