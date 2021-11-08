import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthInputDTO } from './dto/auth-input';
import { AuthType } from './dto/auth.type';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInputDTO): Promise<AuthType> {
    const user = await this.userService.findOneByEmail(data.email);

    const isMatch = await bcrypt.compare(data.password, user.password);

    const token = await this.jwtToken(user);

    if (isMatch) {
      return {
        user,
        token,
      };
    }

    throw new UnauthorizedException('Incorrect email/password');
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
