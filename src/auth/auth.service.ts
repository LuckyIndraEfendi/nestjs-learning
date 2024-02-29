import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validateUser(authPayloadDto: AuthPayloadDto) {
    const findUser = await prisma.user.findFirst({
      where: {
        email: authPayloadDto.email,
      },
    });
    if (!findUser) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
      });
    }
    const comparePassword = await compare(
      authPayloadDto.password,
      findUser.password,
    );
    if (!comparePassword) {
      throw new BadRequestException({
        statusCode: 401,
        message: 'Invalid username or password',
      });
    }
    const { password, ...user } = findUser;
    const token = this.jwtService.sign(user);

    return {
      status: 'success',
      data: user,
      token: token,
    };
  }
}
