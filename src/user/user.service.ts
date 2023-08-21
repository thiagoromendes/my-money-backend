/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { generateHash } from './helper/crypt';
import { Role } from 'src/auth/roles/role';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<CreateUserDto> {
    data.password = await generateHash(data.password);
    const result = await this.prisma.user.create({ data });

    return {
      id: result.id,
      fullName: result.fullName,
      email: result.email,
      roles: result.roles as Role,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findAll(): Promise<UserDto[]> {
    const resultList = await this.prisma.user.findMany();
    const userList: UserDto[] = [];
    resultList.forEach((result) => {
      const { password, ...user } = result;
      userList.push(user);
    });
    return userList;
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<UserDto | null> {
    const result = await this.prisma.user.findUnique({ where });
    const { password, ...user } = result;
    return user;
  }

  async findOneByAuth(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserDto> {
    const { where, data } = params;
    if (data.password != null) {
      data.password = await generateHash(data.password.toString());
    }
    const result = await this.prisma.user.update({
      data,
      where,
    });
    const { password, ...user } = result;
    return user;
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    await this.prisma.user.delete({ where });
  }
}
