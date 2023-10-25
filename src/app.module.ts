import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/strategy/role-auth.guard';
import { GoalModule } from './goal/goal.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [UserModule, AuthModule, GoalModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
