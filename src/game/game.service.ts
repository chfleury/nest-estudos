import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game-input';
import { UpdateGameInput } from './dto/update-game-input';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async findGameById(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne(id);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  async findAllGames(): Promise<Game[]> {
    const games = await this.gameRepository.find();
    return games;
  }

  async createGame(data: CreateGameInput): Promise<Game> {
    const game = this.gameRepository.create(data);
    const savedGame = await this.gameRepository.save(game);
    console.log(game);
    if (!savedGame) {
      throw new InternalServerErrorException('Failed to create game');
    }

    return savedGame;
  }

  async updateGame(id: number, data: UpdateGameInput): Promise<Game> {
    const game = await this.findGameById(id);

    await this.gameRepository.update(game, { ...data });

    const gameUpdated = this.gameRepository.create({ ...game, ...data });

    return gameUpdated;
  }

  async deleteGame(id: number): Promise<boolean> {
    const game = await this.findGameById(id);

    const deletedGame = this.gameRepository.delete(game);

    if (deletedGame) {
      return true;
    }

    return false;
  }
}
