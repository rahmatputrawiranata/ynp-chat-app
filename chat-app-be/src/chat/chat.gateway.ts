import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import {  MessagePattern, Payload } from '@nestjs/microservices';
import { Admin } from 'kafkajs';
import { KAFKA_TOPICS } from 'utils';

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()

  server: Server;
  admin: Admin;
  constructor(
    private readonly chatService: ChatService) {}

    
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }


  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: {
    message: string,
    username: string
  }, @ConnectedSocket() socketClient: Socket) {
    this.chatService.sendMessageToKafka(data);
  }

  @MessagePattern(KAFKA_TOPICS.chat)
  async handleChatMessage(@Payload() data: any) {
    console.log('data received', data)
  }


}
