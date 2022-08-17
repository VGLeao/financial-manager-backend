import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { formatToken } from 'src/utils/formatToken';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserDto })
  async create(@Body() user: UserDto): Promise<User> {
    return await this.usersService.create(user);
  }

  // @Get()
  // async findAll(): Promise<User[]> {
  //   return await this.usersService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUser: UserDto) {
  //   return this.usersService.update(+id, updateUser);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Request() req: any) {
    const token = formatToken(req.headers.authorization);
    return this.usersService.getMe(token);
  }
}
