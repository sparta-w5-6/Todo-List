import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

interface OnTodoEventParams {
  userId: number;
  todoId: number;
}

export class SocketRepository {
  private static socketServer?: SocketServer;

  public static init(appServer: HttpServer) {
    this.socketServer = new SocketServer(appServer);

    this.socketServer.on('connection', (socket) => {
      console.log('client connected!');
      socket.on('onCreateTodo', (params: OnTodoEventParams) => this.onCreateTodo(socket, params));
      socket.on('onDoneTodo', (params: OnTodoEventParams) => this.onDoneTodo(socket, params));
      socket.on('onLikeTodo', (params: OnTodoEventParams) => this.onLikeTodo(socket, params));
    });
  }

  private static onCreateTodo(socket: Socket, params: OnTodoEventParams): void {
    socket.broadcast.emit('createdTodo', params);
  }

  private static onDoneTodo(socket: Socket, params: OnTodoEventParams): void {
    socket.broadcast.emit('doneTodo', params);
  }

  private static onLikeTodo(socket: Socket, params: OnTodoEventParams): void {
    socket.broadcast.emit('likedTodo', params);
  }
}
