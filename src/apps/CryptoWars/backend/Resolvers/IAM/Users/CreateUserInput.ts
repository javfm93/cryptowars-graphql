import { Field, InputType } from 'type-graphql';
import { IsEmail, IsStrongPassword, IsUUID, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsUUID()
  id!: string;

  @Field()
  @Length(4, 24, { message: 'invalid username length' })
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsStrongPassword()
  password!: string;
}
