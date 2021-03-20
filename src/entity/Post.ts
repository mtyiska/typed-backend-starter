import { Field, ObjectType } from "type-graphql";
import {BeforeInsert, Column, Entity as TypeOrmEntity, Index, ManyToOne, OneToMany, RelationId} from "typeorm";
import { slugify } from "../utils/helpers";
import Comment from "./Comment";
import Entity from "./Entity";
import User from "./User";
// import Vote from "./Vote";

@ObjectType()
@TypeOrmEntity("posts")
export default class Post extends Entity{
  constructor(post:Partial<Post>){
    super();
    Object.assign(this, post);
  }

  @Field()
  @Column()
  title: string;

  @Field()
  @Index()
  @Column()
  slug: string;

  @Field()
  @Column({type:"text"})
  body: string


  @Field(() => User)
  @ManyToOne(() => User)
  author: User;
  @RelationId((post: Post) => post.author)
  authorId: number;


  @OneToMany(() => Comment, comment => comment.post)
  comment: Comment[]


  // @Column()
  // category: string

  // @ManyToOne(() => Vote, vote=>vote.posts)
  // votes:Vote[]

  @BeforeInsert()
  uuIdAndSlug(){
    this.slug = slugify(this.title)
  }

}
