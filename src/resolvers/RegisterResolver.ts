import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../entity/User";
import { RegisterInput } from "./type/RegisterInput";
import bcrypt from "bcryptjs";

@Resolver()
export default class RegisterResolver{
  @Query(() => String)
  async hello(){
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") {email, password}:RegisterInput
  ):Promise<User | null>{

    // create the user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({email, password: hashedPassword});
    await user.save();
    return user;
  }
}
