import { Field, InputType } from "type-graphql";

@InputType()
export class CommentInput{

  @Field()
  slug: string;

  @Field()
  body: string


}
