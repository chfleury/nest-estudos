import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet-input';

@Resolver()
export class BetResolver {
  constructor(private betService: BetService) {}

  @Query(() => [Bet])
  async bets(): Promise<Bet[]> {
    const bets = await this.betService.findAllBets();
    return bets;
  }

  @Query(() => Bet)
  async bet(@Args('id') id: number): Promise<Bet> {
    const bet = await this.betService.findBetById(id);

    return bet;
  }

  @Mutation(() => Bet)
  async createBet(@Args('data') data: CreateBetInput): Promise<Bet> {
    const bet = await this.betService.createBet(data);

    return bet;
  }

  @Mutation(() => Bet)
  async deleteBet(@Args('id') id: number): Promise<Bet> {
    const deletedBet = await this.betService.deleteBet(id);

    return deletedBet;
  }
}
