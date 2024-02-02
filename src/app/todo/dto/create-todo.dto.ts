import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto extends OmitType(Todo, [
  'createdAt',
  'deletedAt',
  'id',
  'updatedAt',
]) {
  @IsString({ message: 'O valor é uma string' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @ApiProperty()
  task: string;
  @IsBoolean({ message: 'O valor é um Booleano' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @ApiPropertyOptional()
  isDone: boolean;
}
