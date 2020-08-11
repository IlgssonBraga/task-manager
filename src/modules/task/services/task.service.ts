import { Injectable, Request } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../database/entities/Task';

export interface Request {
  title: string;
  user_id: 'uuid';
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

    if (task.user_id !== req.user.id) {
      throw new Error('You cant access this task!');
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
    { title, user_id, status, description }: Request,
  ): Promise<Task> {
    try {
      const task = new Task();
      Object.assign(task, { title, user_id, status, description });
      await this.taskRepository.update(id, task);
      const taskUpdated = await this.taskRepository.findOne(id);
      return taskUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTask(id: 'uuid'): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
