import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }
  createIOServer(
    port: number,
    options?: ServerOptions & { namespace?: string; server?: any },
  ): any {
    options = {
      ...options,
      cors: {
        origin: process.env.CLIENT_CORS_ORIGIN || true,
        credentials: true,
        methods: ['GET', 'POST'],
      },
      allowEIO3: true,
    };
    return super.createIOServer(port, options);
  }
}
