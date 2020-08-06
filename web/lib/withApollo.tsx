import cookie from "cookie";
import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";
import { getDataFromTree } from "react-apollo";
import initApollo from "./initApollo";
import { isBrowser } from "./isBrowser";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";
import redirect from "./redirect";

export const parseCookies = (req?: any, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
};

export default function withApollo(App: any) {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).qid,
        }
      );

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        return {};
      }

      if (!isBrowser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (err) {
          if (err.message.includes("not authenticated")) {
            redirect(ctx.ctx, "/login");
          }
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token;
        },
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
}
