import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class TodoEntity implements Prisma.todosUncheckedCreateInput {
  @ApiProperty()
  @ApiPropertyOptional()
  id?: number;
  @ApiProperty()
  task: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  deletedAt: string;

  constructor(todo?: Partial<TodoEntity>) {
    this.id = todo?.id;
    this.task = todo?.task;
    this.isDone = todo?.isDone;
    this.createdAt = todo?.createdAt;
    this.updatedAt = todo?.updatedAt;
    this.deletedAt = todo?.deletedAt;
  }
}
