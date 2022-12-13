import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

const TodoService = require('../services/todo.service');

interface OnTodoEventParams {
  userId: number;
  todoId: number;
}

export class NotificationController {
  private static socketServer?: SocketServer;
  private static readonly todoService = new TodoService();

  public static init(appServer: HttpServer) {
    this.socketServer = new SocketServer(appServer);

    this.socketServer.on('connection', (socket) => {
      console.log('client connected!');
      socket.on('onCreateTodo', (params: OnTodoEventParams) => this.onCreateTodo(socket, params));
      socket.on('onDoneTodo', (params: OnTodoEventParams) => this.onDoneTodo(socket, params));
      socket.on('onLikeTodo', (params: OnTodoEventParams) => this.onLikeTodo(socket, params));
    });
  }

  private static async onCreateTodo(socket: Socket, params: OnTodoEventParams): Promise<void> {
    const { todoId, userId } = params;
    const todo = await this.todoService.findTodoList(todoId, userId);

    socket.broadcast.emit('createdTodo', `${todo.title}이 생성되었습니다.`);
  }

  private static async onDoneTodo(socket: Socket, params: OnTodoEventParams): Promise<void> {
    const { todoId, userId } = params;
    const todo = await this.todoService.findTodoList(todoId, userId);

    socket.broadcast.emit('doneTodo', `${todo.title}이 완료되었습니다.`);
  }

  private static async onLikeTodo(socket: Socket, params: OnTodoEventParams): Promise<void> {
    const { todoId, userId } = params;
    const todo = await this.todoService.findTodoList(todoId, userId);

    socket.broadcast.emit('likedTodo', `${userId}님이 ${todo.title}을(를) 좋아합니다.`);
  }
}
