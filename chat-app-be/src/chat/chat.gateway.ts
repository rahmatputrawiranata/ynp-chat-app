import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Admin } from 'kafkajs';
import { Chat } from './schemas/chat.schema';
import { Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  @WebSocketServer()

  server: Server;
  admin: Admin;
  constructor(
    @Inject(forwardRef(() => ChatService)) private readonly chatService: ChatService,
    private jwtService: JwtService) {}

    
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }


  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    // server.use((socket: Socket, next) => {
    //   if(socket.handshake.query && socket.handshake.query.token) {
    //     const token = typeof socket.handshake.query.token === 'string' ? socket.handshake.query.token : socket.handshake.query.token[0];
    //     console.log('token', token);
    //     const decoded = this.jwtService.verify(token);
    //     if(decoded) {
    //       next();
    //     } else {
    //       socket.emit('unauthorized', 'Authentication error');
    //     }
    //   }else {
    //     socket.emit('unauthorized', 'Authentication error');
    //   }
    // }) 
  }

  @SubscribeMessage('send-new-message')
  handleMessage(@MessageBody() data: Chat, @ConnectedSocket() socketClient: Socket) {
    this.chatService.sendMessageToKafka(data);
  }

}
