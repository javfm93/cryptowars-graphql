import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('User')
@Entity('users')
export class UserSchema {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Column()
  password!: string;
}
