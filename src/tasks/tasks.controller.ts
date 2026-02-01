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
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';
import { Task } from './entities';
import type { UUID } from 'crypto';
import { TaskCategory, TaskPriority, TaskStatus } from './enums';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('category') category?: TaskCategory,
    @Query('priority') priority?: TaskPriority,
    @Query('status') status?: TaskStatus,
  ): Promise<Task[]> {
    return this.tasksService.findAll({ category, priority, status });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    return this.tasksService.remove(id);
  }
}
