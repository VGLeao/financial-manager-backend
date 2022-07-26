import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { ExpenseCategory } from '../entities/expense-category.entity';

export class ExpenseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  isRecurrent: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  user: User;

  @ApiProperty()
  category: ExpenseCategory;
}
