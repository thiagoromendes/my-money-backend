import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Goal, Prisma } from '@prisma/client';
import { GoalService } from './goal.service';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post('create')
  async create(@Body() goalData: Prisma.GoalCreateInput): Promise<Goal> {
    return await this.goalService.create(goalData);
  }

  @Get('findAll')
  async findAll(): Promise<Goal[]> {
    return await this.goalService.findAll();
  }

  @Get('findByUser/:id')
  async findByUser(@Param('id') id: string): Promise<Goal> {
    return await this.goalService.findByUser(id);
  }
}
