import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExpenseDto } from './dto/expense.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() expense: ExpenseDto) {
    return this.expensesService.create(expense);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.expensesService.findAll(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpense: ExpenseDto) {
    return this.expensesService.update(+id, updateExpense);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
