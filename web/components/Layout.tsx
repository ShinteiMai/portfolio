import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
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
        <Link href="/login">
          <a>login</a>
        </Link>{" "}
        |{" "}
        <Link href="/register">
          <a>register</a>
        </Link>{" "}
        <Link href="/forgot-password">
          <a>forgot-password</a>
        </Link>{" "}
        | <a href="/hello">hello</a>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
