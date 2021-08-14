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
    client.join(roomName);
    client
      .to(roomName)
      .emit('welcome', client['nickname'], this.countRoom(roomName));
    this.server.sockets.emit('room_change', this.publicRooms());
    return 'ok';
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() [message, roomName]: [string, string],
    @ConnectedSocket() client: Socket,
  ): string {
    client.to(roomName).emit('message', `${client['nickname']}: ${message}`);
    return message;
  }

  @SubscribeMessage('nickname')
  setNickName(
    @MessageBody() nickname: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client['nickname'] = nickname;

    return nickname;
  }

  afterInit(server: Server) {
    this.logger.log('after Init', server);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log('connect', client.id, client);
    this.sockets.set(client.id, client);

    client.onAny((event) => {
      this.logger.verbose(`Socket Event:${event}`);
    });

    client['nickname'] = 'anonymous';
    client.emit('hello', client.nsp.name);
    client.emit('room_change', this.publicRooms());
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log('disconnect', client.id);
    this.sockets.delete(client.id);
    console.log(client['nickname']);
    console.log(client.rooms);
    client.rooms.forEach((room) =>
      client.to(room).emit('bye', client['nickname']),
    );
    // client.broadcast.emit('bye', client['nickname']);
    client.disconnect();
  }

  private publicRooms() {
    const {
      sockets: {
        adapter: { sids, rooms },
      },
    } = this.server;

    console.log(rooms);
    const publicRooms = [];
    rooms.forEach((_, key) => {
      if (sids.get(key) === undefined) {
        publicRooms.push(key);
      }
    });

    return publicRooms;
  }

  private countRoom(roomName) {
    return this.server.sockets.adapter.rooms.get(roomName)?.size;
  }
}
