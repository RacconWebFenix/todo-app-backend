import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.todoService.findOneOrFail(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.todoService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    return await this.todoService.deleterById(+id);
  }
}
