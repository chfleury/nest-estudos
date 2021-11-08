import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class AuthInputDTO {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'email field must not be null' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'password field must not be null' })
  password: string;
}
