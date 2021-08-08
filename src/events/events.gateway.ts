import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface IMessage {
  type?: string;
  payload: string;
}

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('EventsGateway');

  private sockets = new Map<string, Socket>();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('enter_room')
  enterRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.onAny((event) => {
      console.log(`Socket Event:${event}`);
    });

    client.join(roomName);
    client.to(roomName).emit('welcome');
    return 'ok';
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: IMessage,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(message);

    switch (message.type) {
      case 'message':
        this.sockets.forEach((client) => {
          client.send(message.payload);
        });
      case 'nickname':
        console.log(message.payload);
      default:
        break;
    }
  }

  afterInit(server: Server) {
    this.logger.log('after Init', server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('connect', client.id, client);
    this.sockets.set(client.id, client);
    client.emit('hello', client.nsp.name);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('disconnect', client.id);
    this.sockets.delete(client.id);
  }
}
