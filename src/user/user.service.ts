import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const user = await this.databaseService.user.findMany({
      include: {
        Product: true,
      },
    });
    return {
      status: 'success',
      data: user,
      total_items: user.length,
    };
  }
  async findOne(id: number) {
    const user = await this.databaseService.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
      });
    }
    return {
      status: 'success',
      data: user,
    };
  }
  async createUser(userData: Prisma.UserCreateInput) {
    const hashedPassword = await hash(userData.password, 10);
    return await this.databaseService.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        role: userData.role,
      },
    });
  }
  async updateUser(userData: Prisma.UserUpdateInput, id: number) {
    const user = await this.databaseService.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
      });
    }
    const hashedPassword = await hash(`${userData.password}`, 10);
    const update = await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: {
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        role: userData.role,
      },
    });
    return {
      status: 'success',
      data: update,
    };
  }
  async deleteUser(id: number) {
    const user = await this.databaseService.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
      });
    }
    const deleteUser = await this.databaseService.user.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 'success',
      data: deleteUser,
    };
  }
}
