import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/expenses/entities/expense.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      entities: [User, Expense],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
