import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(data: CreateUserDto): Promise<Partial<User>> {
    const { username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    const savedUser = await this.userRepository.save(newUser);

    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found');

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const results = await this.userRepository.find();
    if (results.length === 0) {
      throw new NotFoundException('No Users Are Registered In Database');
    }

    return results;
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async softRemove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not Found');

    return this.userRepository.softRemove(user);
  }

  async remove(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not Found');

    return this.userRepository.delete(id);
  }
}
