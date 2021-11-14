import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/game/game.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Game, { onDelete: 'SET NULL' })
  game: Game;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  gameId: number;

  @Column({ nullable: true })
  userId: number;

  @Column({})
  selectedNumbers: string;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column({ default: false })
  isDeleted: boolean;

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
}
