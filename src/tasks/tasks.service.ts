import { randomUUID } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto';
import { Task } from './interfaces';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [
    {
      id: randomUUID(),
      title: 'Sample Task',
      description: 'This is a sample task description',
      category: 'General',
      priority: 'medium',
      status: 'pending',
      dueDate: new Date().toISOString(),
    },
  ];

  create(task: CreateTaskDto) {
    this.tasks.push({
      id: randomUUID(),
      ...task,
    });

    return this.tasks[this.tasks.length - 1];
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  update(id: string, updateTaskDto: Partial<CreateTaskDto>): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }
}
