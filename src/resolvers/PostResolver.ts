import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware} from "type-graphql";
import Post from "../entity/Post";
import { isAuth } from "../middleware/isAuth";
import User from "../entity/User";
import { MyContext } from "../types/MyContext";

import {PostInput} from "./type/PostInput";
import Comment from "../entity/Comment";
import { CommentInput } from "./type/CommentInput";

@Resolver(() => Post)
export default class PostResolver{

  @Query(() => [Post])
  async listPost(): Promise<Post[] | null>{
    // find posts
    const posts = await Post.find({
      order:{createdAt: "DESC"}
    });

    return posts;
  }


  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("data") {title, body}: PostInput,
    @Ctx() {payload}: MyContext
  ): Promise<Post | undefined | null>{
    try {
      // Find sub

      if(!payload!.email){
        throw new Error("not authenticated");
      }
      // Find User
      const userId = await User.findOneOrFail({email: payload!.email})

      if(!userId){
        throw new Error("not authenticated");
      }

      // Create post
      const post = new Post({title, body, authorId:userId.id});

      // Save post
      await post.save();
      return post;
    } catch (err) {
      console.warn(err)
      return null;
    }
  }


  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async commentOnPost(
    @Arg("data") {slug, body}: CommentInput,
    @Ctx() {payload}: MyContext
  ):Promise<Comment | null>{
    try {

      // validate auth
      if(!payload?.email)return null;

      // find user
      const userId = await User.find({email: payload?.email})
      if(!userId) return null;

      console.log(userId[0])

      // find post
      const post = await Post.findOneOrFail({slug});
      if(!post) return null;


      // create comment
      const comment = new Comment({
        body,
        authorId:userId[0].id,
        post
      });

      // save comment
      await comment.save();

      // return comment
      return comment;
    } catch (err) {
      console.warn(err);
      return null
    }
  }

  @FieldResolver(() => Comment)
  async comment(@Root() post: Post):Promise<Comment>{
    return await Comment.findOneOrFail({where:{post:{id: post.id}}});
  }

  @FieldResolver(() => User)
  async author(@Root() post: Post):Promise<User>{
    return await User.findOneOrFail(post.authorId);
  }
}
