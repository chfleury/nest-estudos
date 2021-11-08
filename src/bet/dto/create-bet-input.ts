import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBetInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'selectedNumbers field must not be null' })
  selectedNumbers: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'gameId field must not be null' })
  gameId: number;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'userId field must not be null' })
  userId: number;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'totalPrice field must not be null' })
  totalPrice: number;
}
