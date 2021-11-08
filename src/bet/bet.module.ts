import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],

  providers: [BetResolver, BetService],
})
export class BetModule {}
