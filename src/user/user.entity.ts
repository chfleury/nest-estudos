import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/profile/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({})
  password: string;

  @ManyToOne(() => Profile)
  profile: Profile;

  @Column({})
  profileId: number;
}
