import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(user: UserDto): Promise<User> {
    const password = encodePassword(user.password);
    return await this.userRepository.save({ ...user, password });
  }

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find({
  //     select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
  //   });
  // }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async update(id: number, updateUser: UserDto): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async getMe(token: string): Promise<User> {
    const { sub } = this.jwtService.verify(token);

    return await this.userRepository.findOne({
      where: { id: sub },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }
}
