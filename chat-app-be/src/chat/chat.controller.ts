import { Controller, Get } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KAFKA_TOPICS } from "utils";
import { ChatService } from "./chat.service";
import { Chat } from "./schemas/chat.schema";

@Controller()
export class ChatController {
    
    constructor(private readonly chatService: ChatService) {}

    @MessagePattern(KAFKA_TOPICS.chat)
    async handleChatMessage(@Payload() data: Chat) {
        console.log('handleChatMessage', data)
        this.chatService.handleIncomingMessageFromKafka(data);
    }

    @Get('chat-histories')
    async getChatHistories(@Payload() data: {last_id: string, limit?: number}) {
        return this.chatService.getChatHistories(data);
    }
}