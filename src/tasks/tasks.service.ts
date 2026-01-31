import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto';
import { Task } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskCategory, TaskPriority, TaskStatus } from './enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);

    return this.tasksRepository.save(task);
  }

  findAll(filters?: {
    category?: TaskCategory;
    priority?: TaskPriority;
    status?: TaskStatus;
  }): Promise<Task[]> {
    const where = filters
      ? Object.fromEntries(
          Object.entries(filters).filter(([, value]) => !!value),
        )
      : {};

    return this.tasksRepository.find({ where });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);

    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);

    await this.tasksRepository.remove(task);
  }
}
