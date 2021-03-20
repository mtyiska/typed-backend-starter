import { Arg,Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import User from "../entity/User";
import { RegisterInput } from "./type/RegisterInput";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import { isEmpty } from "class-validator";

import LoginResponse from "../entity/LoginResponse";
import { MyContext } from "../types/MyContext";

import { createAccessToken, createRefreshToken } from "../utils/auth";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export default class RegisterResolver{
  @Query(() => String)
  @UseMiddleware(isAuth)
  async hello(@Ctx() {payload}: MyContext){
    return `Hello ${payload!.email}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("data") {email, password}:RegisterInput
  ):Promise<User | null>{

    try {

      // Validate data
      const emailUser = await User.findOne({ email })
      if (emailUser) return null;

      // create the user
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassword});
      await user.save();
      return user;
    } catch (err) {
      console.warn(err)
      return null;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") {email, password}:RegisterInput,
    @Ctx() {res}: MyContext
  ):Promise<LoginResponse | null>{

    try {

      // Validate Data
      if (isEmpty(email)) return null;
      if (isEmpty(password)) return null;
      const user = await User.findOne({ email })

      // validate user
      if (!user) return null;
      const passwordMatches = await bcrypt.compare(password, user!.password)

      // validate password
      if (!passwordMatches) {
        return null;
      }

      // create Refresh token
      res.set(
        'Set-Cookie',
        cookie.serialize('token', createRefreshToken(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600,
        })
      )
      // return accessToken
      return {accessToken: createAccessToken(user)};
    } catch (err) {
      console.warn(err)
      return null;
    }
  }
}
