import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  profile: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];
}
