import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'type field must not be null' })
  @IsOptional()
  type?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'description field must not be null' })
  @IsOptional()
  description?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'range field must not be null' })
  @IsOptional()
  range?: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'price field must not be null' })
  @IsOptional()
  price?: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'maxNumber field must not be null' })
  @IsOptional()
  maxNumber?: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'color field must not be null' })
  @IsOptional()
  color?: string;
}
