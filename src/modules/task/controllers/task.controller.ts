import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../../database/entities/Task';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

export interface Request {
  title: string;
  user_id: 'uuid';
  status: string;
  description: string;
}

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() { title, user_id, status, description }: Request,
  ): Promise<Task> {
    const user = await this.taskService.createTask({
      title,
      user_id,
      status,
      description,
    });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Task[]> {
    const tasks = await this.taskService.findAllTasks();
    return tasks;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async show(@Param() id: string): Promise<Task> {
    const task = await this.taskService.findOneTask(id);

    if (!task) {
      throw new Error('Task not found!');
    }

    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param() id: 'uuid',
    @Body() { title, user_id, status, description }: Request,
  ): Promise<Task> {
    const checkTask = await this.taskService.findOneTask(id);

    if (!checkTask) {
      throw new Error('Task not found!');
    }

    const task = await this.taskService.updateTask(id, {
      title,
      user_id,
      status,
      description,
    });

    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param() id: 'uuid'): Promise<void> {
    const checkUser = await this.taskService.findOneTask(id);

    if (!checkUser) {
      throw new Error('User not found!');
    }
    await this.taskService.deleteTask(id);
  }
}
