import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../../database/entities/User';

@Controller('users')
export class UserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  async create(
    @Body() { name, email, password }: ICreateUserDTO,
  ): Promise<User> {
    const user = await this.createUserService.execute({
      name,
      email,
      password,
    });

    return user;
  }

  @Get()
  async index(): Promise<string> {
    return 'hello';
  }
}
