import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import dotenv from "dotenv";

import { redis } from "./redis";
import cors from "cors";
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
  });

  const app = Express();
  app.use(
    cors({
      credentials: true,
      origin: `http://localhost:3000`,
    })
  );

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "asdasdasdasd",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    createBaseUser();
    console.log(`Server started on http://localhost:4000/graphql`);
  });
};

main();
