import { Todo } from '../entities/todo.entity';
// export class IndexTodoSwagger extends PartialType(
//   OmitType(Todo, ['createdAt', 'deletedAt', 'updatedAt']),

// import { ApiProperty } from '@nestjs/swagger';

// ) {}
// export class IndexTodoSwagger {
//   @ApiProperty({ type: Todo, isArray: true })
//   items: Todo[];
// }

export class IndexTodoSwagger extends Todo {}
