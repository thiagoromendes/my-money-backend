import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Public } from '../share/guard_public';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create')
  async create(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<CreateUserDto> {
    return await this.userService.create(userData);
  }

  @Get('findAll')
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Get('findOne')
  async findOne(@Query('id') id: string): Promise<UserDto | null> {
    return await this.userService.findOne({ id });
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserDto> {
    return await this.userService.update({
      where: { id },
      data: userData,
    });
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    await this.userService.remove({ id });
  }
}
