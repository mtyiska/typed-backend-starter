import {PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {classToPlain} from "class-transformer";
import {ObjectType, Field, ID} from "type-graphql";

@ObjectType()
export default abstract class Entity extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  toJSON(){
    return classToPlain(this);
  }
}
