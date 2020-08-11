import { Injectable, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../database/entities/Task';

export interface Request {
  title: string;
  user_id?: 'uuid';
  status: string;
  description: string;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAllTasks(req: any): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { user_id: req.user.id },
    });
    return tasks;
  }

  async findOneTask(id: string, req: any): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
    }

    if (task.user_id !== req.user.id) {
      throw new HttpException(
        'You cant access this task!',
        HttpStatus.FORBIDDEN,
      );
    }
    return task;
  }

  async createTask({
    title,
    user_id,
    status,
    description,
  }: Request): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      user_id,
      status,
      description,
    });

    await this.taskRepository.save(task);

    return task;
  }

  async updateTask(
    id: string,
    { title, status, description }: Request,
    req: any,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
    }

    if (task.user_id !== req.user.id) {
      throw new HttpException(
        'You cant access this task!',
        HttpStatus.FORBIDDEN,
      );
    }

    const task2 = new Task();

    Object.assign(task2, { title, status, description });

    await this.taskRepository.update(id, task2);

    const taskUpdated = await this.taskRepository.findOne(id);

    return taskUpdated;
  }

  async deleteTask(id: 'uuid', req: any): Promise<void> {
    const checkTask = await this.taskRepository.findOne(id);

    if (!checkTask) {
      throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
    }

    if (checkTask.user_id !== req.user.id) {
      throw new HttpException(
        'You cant access this task!',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.taskRepository.delete(id);
  }
}
