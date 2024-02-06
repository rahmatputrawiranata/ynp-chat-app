import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatService } from './chat.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_CLIENT_ID, KAFKA_GROUP_ID } from 'utils';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

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
              brokers: KAFKA_BROKER.split(',')
            },
            consumer: {
              groupId: KAFKA_GROUP_ID
            }
          }
        }
      ])
    ],
    providers: [ChatService, ChatGateway],
    exports: [ChatService],
    controllers: [ChatController]
})

export class ChatModule {}
