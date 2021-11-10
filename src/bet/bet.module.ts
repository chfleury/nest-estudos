import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { GameResolver } from 'src/game/game.resolver';
import { GameService } from 'src/game/game.service';
import { Bet } from './bet.entity';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Game])],

  providers: [BetResolver, BetService, GameService, GameResolver],
})
export class BetModule {}
