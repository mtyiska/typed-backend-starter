import "reflect-metadata";
import dotenv from "dotenv";


import {createConnection} from "typeorm";
import {createApp} from "./app";

import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";

import UserResolver from "./resolvers/UserResolver";
import PostResolver from "./resolvers/PostResolver";

import { APP_PORT, BASE_URL } from "./config";
dotenv.config();

const main = async () =>{
  await createConnection().catch((err) => console.warn(err));


 const app = createApp()
  const schema = await buildSchema({
    resolvers:[UserResolver, PostResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({req, res}: any) =>({req, res})
  });

  apolloServer.applyMiddleware({app});

  app.listen(APP_PORT, () =>console.log(`Server started on ${BASE_URL}${APP_PORT}/graphql`))

}

main();
