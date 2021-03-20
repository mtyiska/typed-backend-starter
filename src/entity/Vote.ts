// import { ObjectType } from "type-graphql";
// import {Column, Entity as TOEntity, Index, ManyToOne} from "typeorm";
// import Comment from "./Comment";

// import Entity from "./Entity";
// import Post from "./Post";
// import User from "./User";

// @ObjectType()
// @TOEntity("votes")
// export default class Vote extends Entity{
//   constructor(vote: Partial<Vote>){
//     super()
//     Object.assign(this, vote)
//   }


//   @Column()
//   value: number

//   @ManyToOne(() => User)
//   user:User

//   @Column()
//   username: string

//   @ManyToOne(() => Post)
//   posts: Post

//   @ManyToOne(() => Comment)
//   comment: Comment
// }
