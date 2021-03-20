import User from "../entity/User";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config"

export const createAccessToken = (user:User) =>{
  return jwt.sign({ email:user.email },ACCESS_TOKEN_SECRET!,{
    expiresIn:"15m"
  } )
}

export const createRefreshToken = (user:User) =>{
  return jwt.sign({ email:user.email },REFRESH_TOKEN_SECRET!,{
    expiresIn:"7d"
  } )
}
