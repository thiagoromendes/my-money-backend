import { Injectable } from '@nestjs/common';
import { Expenses, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DateUtil } from 'src/share/date_util';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ExpensesCreateInput): Promise<Expenses> {
    return await this.prisma.expenses.create({
      data: {
        ...data,
        user: {
          connect: { id: data.user.connect.id },
        },
      },
    });
  }

  async findAllByUser(userid: string): Promise<Expenses[]> {
    return await this.prisma.expenses.findMany({
      where: {
        userId: userid,
        registrationDate: {
          gte: DateUtil.getFirstDateOfMonth(),
          lte: DateUtil.getLastDateOfMonth(),
        },
      },
      orderBy: {
        registrationDate: 'desc',
      },
    });
  }

  async findOne(
    where: Prisma.ExpensesWhereUniqueInput,
  ): Promise<Expenses | null> {
    return await this.prisma.expenses.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.ExpensesWhereUniqueInput;
    data: Prisma.ExpensesUpdateInput;
  }): Promise<Expenses> {
    const { where, data } = params;
    return await this.prisma.expenses.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ExpensesWhereUniqueInput): Promise<Expenses> {
    return await this.prisma.expenses.delete({ where });
  }
}
