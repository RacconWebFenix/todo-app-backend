import { Prisma } from '@prisma/client';

export class Todo implements Prisma.todosUncheckedCreateInput {
  id?: number;
  task: string;
  isDone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
