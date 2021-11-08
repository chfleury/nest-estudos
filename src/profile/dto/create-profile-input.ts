import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'profile field must not be null' })
  profile: string;
}
