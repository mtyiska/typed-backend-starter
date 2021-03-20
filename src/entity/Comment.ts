import {Field, ObjectType } from "type-graphql";
import {Column, Entity as TypeOrmEntity, ManyToOne, RelationId} from "typeorm";
import Entity from "./Entity"
import Post from "./Post";
import User from "./User";


@ObjectType()
@TypeOrmEntity("comments")
export default class Comment extends Entity{
  constructor(comment: Partial<Comment>){
    super();
    Object.assign(this, comment)
  }


  @Field()
  @Column({type: "text"})
  body: string

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;
  @RelationId((comment: Comment) => comment.author)
  authorId: number;


  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;
  @RelationId((comment: Comment) => comment.post)
  postId: number;

}
