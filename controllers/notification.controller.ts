import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import { TodoService } from '../services/todo.service';

const UserService = require('../services/user.service');
const UserRepository = require('../repositories/user.repository');
const { Users } = require('../models');

interface OnTodoEventParams {
  userId: number;
  todoId: number;
}

export class NotificationController {
  private socketServer?: SocketServer;
  private readonly todoService = new TodoService();
  private readonly userService = new UserService(new UserRepository(Users));

  public init(appServer: HttpServer) {
    this.socketServer = new SocketServer(appServer);

    this.socketServer.on('connection', (socket) => {
      console.log('client connected!');
      socket.on('onCreateTodo', (params: OnTodoEventParams) => this.onCreateTodo(socket, params));
      socket.on('onDoneTodo', (params: OnTodoEventParams) => this.onDoneTodo(socket, params));
      socket.on('onLikeTodo', (params: OnTodoEventParams) => this.onLikeTodo(socket, params));
    });
  }

  private async onCreateTodo(socket: Socket, params: OnTodoEventParams): Promise<void> {
    const { todoId, userId } = params;
    const todo: any = await this.todoService.findTodoList(todoId, userId);

    socket.broadcast.emit('createdTodo', `${todo.title}이(가) 생성되었습니다.`);
  }

  private async onDoneTodo(socket: Socket, params: OnTodoEventParams): Promise<void> {
    const { todoId, userId } = params;
    const todo: any = await this.todoService.findTodoList(todoId, userId);

    socket.broadcast.emit('doneTodo', `${todo.title}이(가) 완료되었습니다.`);
  }

  private async onLikeTodo(socket: Socket, params: OnTodoEventParams): Promise<void> {
    const { todoId, userId } = params;
    const todo: any = await this.todoService.findTodoList(todoId, userId);
    const user = await this.userService.getUser(userId);

    socket.broadcast.emit('likedTodo', `${user.nickname}님이 ${todo.title}을(를) 좋아합니다.`);
  }
}
