import {Entity as TypeOrmEntity, Column, Index} from "typeorm";
import {Exclude} from "class-transformer";

import Entity from "./Entity";
import {Field, ObjectType} from "type-graphql";

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
}
