import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: 1, task: 'task1', isDone: true }),
  new TodoEntity({ id: 2, task: 'task2', isDone: false }),
  new TodoEntity({ id: 3, task: 'task3', isDone: true }),
];

const newTodoEntity = new TodoEntity({
  isDone: true,
  task: 'credated',
});

const body: CreateTodoDto = {
  isDone: true,
  task: 'created',
};

const updateDto: UpdateTodoDto = {
  task: 'oi',
  isDone: true,
};

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updateDto),
            deleterById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('should return a todo list entity successfuly', async () => {
      // Act
      const result = await todoController.index();

      // Assert
      expect(result).toEqual(todoEntityList);
      expect(typeof result).toEqual('object');
      expect(typeof result[0].id).toEqual('number');
      expect(result[0].id).toEqual(todoEntityList[0].id);
      expect(todoService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should creat a todo successfuly', async () => {
      // Arrange

      // Act
      const result = await todoController.create(body);

      // Assert
      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a todo item successfuly', async () => {
      // Arrange

      // Act
      const result = await todoController.show('1');

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoService.findOneOrFail).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(todoService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfuly', async () => {
      // Arrange

      // Act
      const result = await todoController.update('1', updateDto);

      // Assert
      expect(result).toEqual(updateDto);
      expect(todoService.update).toHaveBeenCalledTimes(1);
      expect(todoService.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.update('1', updateDto)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should remove a todo item successfuly', async () => {
      // Arrange

      // Act
      const result = await todoController.destroy('1');

      // Assert
      expect(result).toBeUndefined();
      expect(todoService.deleterById).toHaveBeenCalledTimes(1);
      expect(todoService.deleterById).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'deleterById').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.destroy('1')).rejects.toThrowError();
    });
  });
});
