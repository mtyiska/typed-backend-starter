import { ObjectType } from "type-graphql";
import {Entity as TypeOrmEntity} from "typeorm";
import Entity from "./Entity";

@ObjectType()
@TypeOrmEntity("posts")
export default class Post extends Entity{
  constructor(post:Partial<Post>){
    super();
    Object.assign(this, post);
  }


}
