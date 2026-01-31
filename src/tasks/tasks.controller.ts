import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';
import type { Task } from './interfaces';
import type { UUID } from 'crypto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('priority') priority?: string,
    @Query('status') status?: string,
  ): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID): Task {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID): void {
    this.tasksService.remove(id);
  }
}
