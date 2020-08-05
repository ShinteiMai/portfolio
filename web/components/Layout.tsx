import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { MeComponent } from "../generated/apolloComponents";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Container = styled.div`
  background-color: #fff;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/register">
          <a>register</a>
        </Link>{" "}
        <Link href="/forgot-password">
          <a>forgot-password</a>
        </Link>{" "}
        <Link href="/login">
          <a>login</a>
        </Link>
        | <a href="/hello">hello</a>
        <MeComponent>
          {({ data, loading }) => {
            if (!data || loading || !data.me) {
              return null;
            }

            return (
              <Link href="/logout">
                <a>logout</a>
              </Link>
            );
          }}
        </MeComponent>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </Container>
);

export default Layout;
