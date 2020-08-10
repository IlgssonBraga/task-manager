import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../database/entities/User';

export interface Request {
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password }: Request): Promise<User> {
    const checkEmail = await this.userService.findUserByEmail(email);

    if (checkEmail) {
      throw new Error('E-mail already exists!');
    }

    const user = await this.userService.createUser({
      name,
      email,
      password,
    });

    return user;
  }

  @Get()
  async index(): Promise<User[]> {
    const user = await this.userService.findAll();
    return user;
  }

  @Get('/:id')
  async show(@Param() id: string): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  @Put('/:id')
  async update(
    @Param() id: 'uuid',
    @Body() { name, email, password }: Request,
  ): Promise<User> {
    const checkUser = await this.userService.findOne(id);

    if (!checkUser) {
      throw new Error('User not found!');
    }

    const user = await this.userService.updateUser(id, {
      name,
      email,
      password,
    });

    return user;
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param() id: string): Promise<void> {
    const checkUser = await this.userService.findOne(id);

    if (!checkUser) {
      throw new Error('User not found!');
    }
    await this.userService.deleteUser(id);
  }
}
