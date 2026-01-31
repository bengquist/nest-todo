import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TaskCategory, TaskPriority, TaskStatus } from '../enums';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  category?: TaskCategory;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.Low,
  })
  priority?: TaskPriority;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.Pending,
  })
  status?: TaskStatus;

  @Column({ type: 'date', nullable: true })
  dueDate?: string;
}
