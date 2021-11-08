import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'email field must not be null' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'password field must not be null' })
  @IsOptional()
  password?: string;
}
