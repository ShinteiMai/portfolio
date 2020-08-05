import React from "react";
import Layout from "../components/Layout";
import { HelloComponent } from "../generated/apolloComponents";

const Hello = () => {
  return (
    <Layout title="Hello page">
      <HelloComponent>
        {({ data }) => (
          <div>{data && data.hello ? data.hello : "loading..."}</div>
        )}
      </HelloComponent>
    </Layout>
  );
};

export default Hello;
