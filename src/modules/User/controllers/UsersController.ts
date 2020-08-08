import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from '../services/CreateUserService';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../../Database/entities/User';

@Controller()
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('/users')
  async create(
    @Body() { name, email, password }: ICreateUserDTO,
  ): Promise<User> {
    const user = this.createUserService.execute({
      name,
      email,
      password,
    });

    return user;
  }
}
