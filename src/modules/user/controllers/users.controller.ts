import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../database/entities/User';

export interface Request {
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private createUserService: UserService) {}

  @Post()
  async create(@Body() { name, email, password }: Request): Promise<User> {
    const user = await this.createUserService.createUser({
      name,
      email,
      password,
    });

    return user;
  }

  @Get()
  async index(): Promise<User[]> {
    const user = await this.createUserService.findAll();
    return user;
  }
}
