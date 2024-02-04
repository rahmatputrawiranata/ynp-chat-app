import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatModule } from './chat/chat.module';
import { KAFKA_BROKER, KAFKA_CLIENT_ID, KAFKA_GROUP_ID } from '../utils';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/chat-app'),
    AuthModule,
    ChatModule,
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
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
