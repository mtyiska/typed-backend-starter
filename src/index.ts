import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import {createConnection} from "typeorm";
import express from "express";

import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";

import RegisterResolver from "./resolvers/RegisterResolver";

const main = async () =>{
  await createConnection().catch((err) => console.warn(err));

  const app = express();

  const schema = await buildSchema({
    resolvers:[RegisterResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({req, res}: any) =>({req, res})
  });

  app.get("/", (_,res) => res.send("hello world"));

  apolloServer.applyMiddleware({app});

  app.listen(4000, () =>console.log(`Server started on http://localhost:${4000}/graphql`))

}

main();
