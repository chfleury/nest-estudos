import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { Bet } from './bet.entity';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Game])],

  providers: [BetResolver, BetService],
})
export class BetModule {}
