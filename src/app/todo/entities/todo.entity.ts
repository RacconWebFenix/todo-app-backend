import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Todo implements Prisma.todosUncheckedCreateInput {
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
}
