import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.save(user);
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
}
