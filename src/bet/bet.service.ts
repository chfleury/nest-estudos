import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetInput } from './dto/create-bet-input';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async findBetById(id: number): Promise<Bet> {
    const bet = await this.betRepository.findOne(id);

    if (!bet) {
      throw new NotFoundException('Bet not found');
    }

    return bet;
  }

  async findAllBets(): Promise<Bet[]> {
    const bets = await this.betRepository.find({ where: { isDeleted: false } });
    console.log(bets);
    return bets;
  }

  async createBet(data: CreateBetInput): Promise<Bet> {
    const game = await this.gameRepository.findOne(data.gameId);
    let selectedNumbersArray;
    try {
      selectedNumbersArray = data.selectedNumbers.split(',');
    } catch (e) {
      throw new BadRequestException(
        'should select ' + game.maxNumber + ' numbers',
      );
    }

    selectedNumbersArray.forEach((element) => {
      if (element <= 0 || element > game.range) {
        throw new BadRequestException(
          'selectedNumbers not in range ' + game.range,
        );
      }
    });

    if (selectedNumbersArray.length !== game.maxNumber) {
      throw new BadRequestException(
        'should select ' + game.maxNumber + ' numbers',
      );
    }

    const bet = this.betRepository.create({
      selectedNumbers: data.selectedNumbers,
      userId: data.userId,
      gameId: data.gameId,
      totalPrice: game.price,
    });
    const savedBet = await this.betRepository.save(bet);

    if (!savedBet) {
      throw new InternalServerErrorException('Failed to create bet');
    }

    return savedBet;
  }

  async deleteBet(id: number): Promise<Bet> {
    const bet = await this.findBetById(id);

    bet.isDeleted = true;

    await this.betRepository.save(bet);

    const betUpdated = this.betRepository.create({ ...bet, isDeleted: true });

    return betUpdated;
  }
}
