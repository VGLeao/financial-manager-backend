import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

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
}
