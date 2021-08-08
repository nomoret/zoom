import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('EventsGateway');

  private sockets = new Map<string, Socket>();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.sockets.forEach((client) => {
      client.send(message + ' from server');
    });
    // this.server.emit('message', message + ' from server');
  }

  afterInit(server: Server) {
    this.logger.log('after Init', server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('connect', client.id);
    this.sockets.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('disconnect', client.id);
    this.sockets.delete(client.id);
  }
}
