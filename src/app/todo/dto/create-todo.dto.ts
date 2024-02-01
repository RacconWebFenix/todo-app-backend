import { Todo } from '../entities/todo.entity';
import { IsString } from 'class-validator';

export class CreateTodoDto extends Todo {
  @IsString()
  task: string;
  @IsString()
  isDone: string;
  @IsString()
  createdAt: string;
  @IsString()
  updatedAt: string;
  @IsString()
  deletedAt: string;
}
