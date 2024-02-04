import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from 'utils';

@Injectable()
export class ChatService implements OnModuleInit {

    @InjectModel(Chat.name) private model: Model<ChatDocument>;

    constructor(
        @Inject('CHAT_SERVICE') private chatClient: ClientKafka
    ) {}

    

    // async getChatHistory(timestamps: Date) {
    //     return this.model.find({createdAt: {$lt: timestamps}}).sort({createdAt: -1}).limit(100).exec();
    // }

    // async storeChatMessage(message: Chat) {
    //     return this.model.create(message);
    // }

    sendMessageToKafka(chat: Chat) {
        this.chatClient.send(KAFKA_TOPICS.chat, chat).subscribe(
            (chat) => console.log(chat),
            (error) => console.error('Error sending message:', error)
        );
    }

    onModuleInit() {
        this.chatClient.subscribeToResponseOf(KAFKA_TOPICS.chat);
        this.chatClient.connect();
    }

}
