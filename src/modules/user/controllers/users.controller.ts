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

  @Get('/:id')
  async show(@Param() id: string): Promise<User> {
    const user = await this.createUserService.findOne(id);
    return user;
  }

  @Put('/:id')
  async update(
    @Param() id: 'uuid',
    @Body() { name, email, password }: Request,
  ): Promise<User> {
    const user = await this.createUserService.updateUser(id, {
      name,
      email,
      password,
    });

    return user;
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param() id: string): Promise<void> {
    await this.createUserService.deleteUser(id);
  }
}
