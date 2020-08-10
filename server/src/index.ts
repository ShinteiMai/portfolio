import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { graphqlUploadExpress } from "graphql-upload";

import Express from "express";
import session from "express-session";
import * as path from "path";
import connectRedis from "connect-redis";
import dotenv from "dotenv";
import cors from "cors";

import { redis } from "./redis";
import { createBaseUser } from "./modules/utils/createBaseUser";

const main = async () => {
  dotenv.config();
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    uploads: false,
  });

  const app = Express();
  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: process.env.COOKIE_NAME,
      secret: process.env.SECRET as any,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  app.use(
    "/graphql",
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  );

  app.use("/images", Express.static(path.join(__dirname, "/../images")));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    createBaseUser();
    console.log(`[System] Server started on ${process.env.BASE_URL}/graphql`);
  });
};

main();
