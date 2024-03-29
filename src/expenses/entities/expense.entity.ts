import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExpenseCategory } from './expense-category.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  isRecurrent: boolean;

  @Column()
  date: Date;

  @Column()
  isPaid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn()
  user: User;

  @ManyToOne(() => ExpenseCategory, (category) => category.expenses, {
    cascade: ['insert'],
  })
  @JoinColumn()
  category: ExpenseCategory;
}
