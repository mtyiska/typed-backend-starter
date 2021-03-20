import { verify } from "jsonwebtoken";
import {MiddlewareInterface, NextFn, ResolverData} from "type-graphql";
import { MyContext } from "../types/MyContext";
import { ACCESS_TOKEN_SECRET } from "../config"

export class isAuth implements MiddlewareInterface<MyContext>{
  async use({context}:ResolverData<MyContext>, next: NextFn){
    const authorization = context.req.headers["authorization"];

    if(!authorization){
      throw new Error("not authenticated");
    }
    try{
      const token = authorization?.split(" ")[1];
      const payload = verify(token,ACCESS_TOKEN_SECRET!);
      context.payload = payload as any; // as any because this is a string
    }catch(err) {
      console.warn(err);
      throw new Error("not authenticated");
    }
    return next()
  }
}
