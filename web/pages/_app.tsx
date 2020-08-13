import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
// import { createGlobalStyle } from "styled-components";

/* const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: Merriweather, sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.6;
    background-color: #173248;
    color: #fff5e7;
  }
  `;*/

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ThemeProvider>
        <ApolloProvider client={apolloClient}>
          <CSSReset />
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
