import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KAFKA_TOPICS } from "utils";
import { ChatService } from "./chat.service";
import { Chat } from "./schemas/chat.schema";

@Controller()
export class ChatController {
    
    constructor(private readonly chatService: ChatService) {}

    @MessagePattern(KAFKA_TOPICS.chat)
    async handleChatMessage(@Payload() data: Chat) {
        this.chatService.handleIncomingMessageFromKafka(data);
    }
}