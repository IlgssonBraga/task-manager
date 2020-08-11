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
  Req,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../../database/entities/Task';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

export interface Request {
  title: string;
  user_id?: 'uuid';
  status: string;
  description: string;
}

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() { title, status, description }: Request,
    @Req() req: any,
  ): Promise<Task> {
    const user = await this.taskService.createTask({
      title,
      user_id: req.user.id,
      status,
      description,
    });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Req() req: any): Promise<Task[]> {
    const tasks = await this.taskService.findAllTasks(req);
    return tasks;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async show(@Param() id: string, @Req() req: any): Promise<Task> {
    const task = await this.taskService.findOneTask(id, req);
    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param() id: 'uuid',
    @Body() { title, status, description }: Request,
    @Req() req: any,
  ): Promise<Task> {
    const task = await this.taskService.updateTask(
      id,
      {
        title,
        status,
        description,
      },
      req,
    );

    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param() id: 'uuid', @Req() req: any): Promise<void> {
    await this.taskService.deleteTask(id, req);
  }
}
