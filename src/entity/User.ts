import {Entity as TypeOrmEntity, Column, Index, OneToMany} from "typeorm";
import {Exclude} from "class-transformer";

import Entity from "./Entity";
import {Field, ObjectType} from "type-graphql";
import Post from "./Post";
import Comment from "./Comment";
// import Vote from "./Vote";

@ObjectType()
@TypeOrmEntity("users")
export default class User extends Entity{
    constructor(user:Partial<User>){
        super();
        Object.assign(this, user)
    }

    @Field()
    @Index()
    @Column({unique:true})
    email: string

    @Exclude()
    @Column()
    password: string

    @Field()
    @Column("bool", {default:false})
    confirmed: boolean


    @OneToMany(() => Post, post => post.author)
    posts: Post[]


    @OneToMany(() => Comment, comment=>comment.author)
    comments: Comment[]

    // @OneToMany(()=> Vote, vote=>vote.user)
    // votes:Vote[]

}
