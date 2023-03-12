import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

console.log('---------------- userschema called');
@ObjectType('User')
@Entity('users')
export class UserSchema {
  constructor() {
    console.log('USERSCHEMA CONSTRUCTIR');
  }
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  password!: string;
}
