import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.todos.findMany({});
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new Error('Error fetching TODO items');
    }
  }

  async findOneOrFail(id: number) {
    try {
      return await this.prisma.todos.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateTodoDto) {
    return await this.prisma.todos.create({ data });
  }

  async update(id: number, data: UpdateTodoDto) {
    return await this.prisma.todos.update({
      where: { id },
      data,
    });
  }

  async deleterById(id: number) {
    try {
      const result = await this.prisma.todos.delete({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException(`Todo com id ${id} não encontrado`);
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Erro ao deletar o Todo com id ${id}`);
    }
  }
}
