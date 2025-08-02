import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.findAll();
    return users.map(({ password: _, ...user }) => user);
  }

  async findOne(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User Not Found');

    const { password: _, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto)
    ;
  }

  async softRemove(id: number): Promise<User> {
    return this.userRepository.softRemove(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.remove(id);
  }
}
