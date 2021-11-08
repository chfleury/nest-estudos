import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { isAdminGuard } from 'src/roles/isAdmin.guard';
import { CreateGameInput } from './dto/create-game-input';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver()
export class GameResolver {
  constructor(private gameService: GameService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    const games = await this.gameService.findAllGames();
    return games;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => Game)
  async game(@Args('id') id: number): Promise<Game> {
    const game = await this.gameService.findGameById(id);

    return game;
  }

  @UseGuards(GqlAuthGuard)
  @UseGuards(isAdminGuard)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const game = await this.gameService.createGame(data);

    return game;
  }

  @UseGuards(GqlAuthGuard)
  @UseGuards(isAdminGuard)
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: number): Promise<boolean> {
    const bool = await this.gameService.deleteGame(id);

    return bool;
  }
}
