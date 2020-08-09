import { Injectable, Request } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/User';

export interface Request {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    return user;
  }

  async createUser({ name, email, password }: Request): Promise<User> {
    const user = this.userRepository.create({ name, email, password });

    await this.userRepository.save(user);

    return user;
  }

  async updateUser(
    id: string,
    { name, email, password }: Request,
  ): Promise<User> {
    try {
      const user = new User();
      Object.assign(user, { name, email, password });
      await this.userRepository.update(id, user);
      const userUpdated = await this.userRepository.findOne(id);
      return userUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
