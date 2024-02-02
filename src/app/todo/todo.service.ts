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
      throw new Error('Error fetching TODO items');
    }
  }

  async findOneOrFail(id: number) {
    try {
      const result = await this.prisma.todos.findUnique({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Todo com id ${id} não encontrado`);
      }

      return result;
    } catch (error) {
      throw new NotFoundException(`Erro:  ${error.message}`);
    }
  }

  async create(data: CreateTodoDto) {
    // fazer tratamento de errro na validação de dados
    return await this.prisma.todos.create({ data });
  }

  async update(id: number, data: UpdateTodoDto) {
    // fazer tratamento de errro na validação de dados
    try {
      const result = await this.prisma.todos.update({
        where: { id },
        data,
      });

      if (!result) {
        throw new NotFoundException(`Todo com id ${id} não encontrado`);
      }
      return result;
    } catch (error) {
      throw new Error(`Erro:  ${error.message}`);
    }

    return;
  }

  async deleterById(id: number) {
    try {
      const result = await this.prisma.todos.delete({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException(`Todo com id ${id} não encontrado`);
      }

      return `Todo com id ${id} removido com sucesso`;
    } catch (error) {
      throw new NotFoundException(`Erro ao deletar o Todo com id ${id}`);
    }
  }
}
