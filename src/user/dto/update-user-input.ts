import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'password field must not be null' })
  @IsOptional()
  password?: string;
}
