import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-input';
import { UpdateUserInput } from './dto/update-user-input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    console.log(users);
    return users;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    console.log(data);
    const savedUser = await this.userRepository.save(user);
    console.log(user);
    if (!savedUser) {
      throw new InternalServerErrorException('Failed to create user');
    }

    return savedUser;
  }

  async updateUser(id: number, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);

    user.password = data.password;
    await this.userRepository.save(user);

    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.userRepository.delete({ id });

    if (deletedUser.affected) {
      return true;
    }

    return false;
  }
}
