import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expenses, Prisma } from '@prisma/client';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('create')
  async create(
    @Body() expenseData: Prisma.ExpensesCreateInput,
  ): Promise<Expenses> {
    return await this.expenseService.create(expenseData);
  }

  @Get('findAllByUser/:id')
  async findAllByUser(@Param('id') id: string): Promise<Expenses[]> {
    return await this.expenseService.findAllByUser(id);
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.expenseService.findOne({ id });
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() expenseData: Prisma.ExpensesUpdateInput,
  ): Promise<Expenses> {
    return await this.expenseService.update({
      where: { id },
      data: expenseData,
    });
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<Expenses> {
    return await this.expenseService.remove({ id });
  }
}
