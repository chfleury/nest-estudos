import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'type field must not be null' })
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'description field must not be null' })
  description: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'range field must not be null' })
  range: number;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'price field must not be null' })
  price: number;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'maxNumber field must not be null' })
  maxNumber: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'color field must not be null' })
  color: string;
}
