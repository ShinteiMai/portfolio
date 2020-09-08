import React, { ReactNode } from "react";
import { default as NextLink } from "next/link";
import Head from "next/head";
import { Box, Link } from "@chakra-ui/core";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Steven Hansel" }: Props) => (
  <Box>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box display="flex" justifyContent="space-between" marginTop={6}>
      <Box marginLeft={12}>Site Icon</Box>
      <Box marginRight={12}>
        <NextLink href="/">
          <Link marginRight={5}>About</Link>
        </NextLink>
        <NextLink href="/">
          <Link marginRight={5}>Timeline</Link>
        </NextLink>
        <NextLink href="/">
          <Link marginRight={5}>Contact</Link>
        </NextLink>
        <NextLink href="/">
          <Link>Projects</Link>
        </NextLink>
      </Box>
    </Box>

    <Box width={["80%", "70%"]} marginX="auto" marginY={[16, 24]}>
      {children}
    </Box>
  </Box>
);

export default Layout;
