import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatService } from './chat.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JWT_SECRET, KAFKA_CLIENT_ID, KAFKA_GROUP_ID } from 'utils';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
      MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}]),
      ClientsModule.register([
        {
          name: 'CHAT_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: KAFKA_CLIENT_ID,
              brokers: process.env.KAFKA_BROKERS.split(',')
            },
            consumer: {
              groupId: KAFKA_GROUP_ID
            }
          }
        }
      ]),
      JwtModule.register({
        secret: JWT_SECRET
      })
    ],
    providers: [ChatService, ChatGateway],
    exports: [ChatService],
    controllers: [ChatController]
})

export class ChatModule {}
