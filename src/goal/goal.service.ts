import { Injectable } from '@nestjs/common';
import { Goal, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GoalCreateInput): Promise<Goal> {
    const result = await this.prisma.goal.create({
      data: {
        ...data,
        user: {
          connect: { id: data.user.connect.id },
        },
      },
    });

    return result;
  }

  async findAll(): Promise<Goal[]> {
    return await this.prisma.goal.findMany();
  }

  async findByUser(userId: string): Promise<Goal> {
    return await this.prisma.goal.findFirst({
      where: {
        userId: userId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
