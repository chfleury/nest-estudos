import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Bet } from 'src/bet/bet.entity';
import { Profile } from 'src/profile/profile.entity';
import * as bcrypt from 'bcrypt';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany(() => Bet, (bet) => bet.userId)
  users: Bet[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPass(): Promise<void> {
    const saltOrRounds = 10;
    const password = this.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    this.password = hash;
  }
}
