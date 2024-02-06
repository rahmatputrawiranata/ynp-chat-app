import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Admin } from 'kafkajs';
import { Chat } from './schemas/chat.schema';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()

  server: Server;
  admin: Admin;
  constructor(
    @Inject(forwardRef(() => ChatService)) private readonly chatService: ChatService) {}

    
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }


  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: Chat, @ConnectedSocket() socketClient: Socket) {
    this.chatService.sendMessageToKafka(data);
  }

}
