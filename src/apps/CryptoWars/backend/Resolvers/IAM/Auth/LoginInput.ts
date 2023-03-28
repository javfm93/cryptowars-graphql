import { Field, InputType } from 'type-graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsStrongPassword()
  password!: string;
}
