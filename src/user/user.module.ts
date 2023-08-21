import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
