import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'email field must not be null' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'password field must not be null' })
  password: string;
}
