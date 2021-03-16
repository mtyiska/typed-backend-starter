import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput{
  @Field()
  @IsEmail(undefined, {message:"Must be a valid email"})
  @Length(8, 255, {message:"Email is empty"})
  email: string

  @Field()
  @Length(6, 255, {message: "Must be at least 3 characters"})
  password: string

}
