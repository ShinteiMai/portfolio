import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
