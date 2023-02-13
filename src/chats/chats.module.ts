import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChattingModel, Chattings } from './models/chattings.model';
import { Socket, SocketSchema } from './models/sockets.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chattings.name, schema: ChattingModel },
      { name: Socket.name, schema: SocketSchema },
    ]),
  ],

  providers: [ChatsGateway],
})
export class ChatsModule {}
