import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseDto } from './dto/expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(expense: ExpenseDto): Promise<Expense> {
    return await this.expenseRepository.save(expense);
  }

  async findAll(userId: number): Promise<Expense[]> {
    // return await this.expenseRepository.find({ relations: ['user'] });
    return await this.expenseRepository
      .createQueryBuilder('expenses')
      .leftJoinAndSelect('expenses.user', 'user')
      .select(['expenses', 'user.id'])
      .where('expenses.user.id = :id', { id: userId })
      .getMany();
  }

  async findOne(id: number): Promise<Expense> {
    return await this.expenseRepository.findOneBy({ id: id });
  }

  async update(id: number, updateExpense: ExpenseDto): Promise<Expense> {
    await this.expenseRepository.update(id, updateExpense);
    return await this.expenseRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    return await this.expenseRepository.delete(id);
  }
}
