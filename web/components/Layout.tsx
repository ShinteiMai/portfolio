import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "styled-components";

import Navbar from "../components/Navbar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Container = styled.div``;
const Main = styled.main`
  padding-top: 16rem;
`;
const Content = styled.div`
  width: 80rem;
  margin: 0 auto;

  @media only screen and (max-width: 68.75em) {
    width: 65%;
  }

  @media only screen and (max-width: 750px) {
    width: 75%;
  }
`;

const Layout = ({ children, title = "This is the default title" }: Props) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/static/logo.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar />
      </header>
      <Main>
        <Content>{children}</Content>
      </Main>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Container>
  );
};

export default Layout;
