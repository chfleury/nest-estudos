import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Profile } from 'src/profile/profile.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'email field must not be null' })
  @IsEmail()
  email: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Profile Id field must not be null' })
  profileId: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'password field must not be null' })
  password: string;
}
