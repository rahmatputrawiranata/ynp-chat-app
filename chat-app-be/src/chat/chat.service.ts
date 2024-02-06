import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from 'utils';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService implements OnModuleInit {

    @InjectModel(Chat.name) private model: Model<ChatDocument>;

    constructor(
        @Inject('CHAT_SERVICE') private chatClient: ClientKafka,
        @Inject(forwardRef(() => ChatGateway)) private chatGateway: ChatGateway
    ) {}

    sendMessageToKafka(chat: Chat) {
        this.chatClient.send(KAFKA_TOPICS.chat, chat).subscribe();
    }

    handleIncomingMessageFromKafka(chat: Chat) {
        this.model.create(chat)
        .then(() => this.chatGateway.server.emit('receive-new-message', 'new message!'))
        .catch(err => this.chatGateway.server.emit('receive-new-message', 'error'));
    }

    

    async getChatHistories(data: {last_id?: string, limit?: number}) {
        const queryOptions: any  = {
        }

        if(data.last_id) {
            queryOptions._id = {$gt: data.last_id}
        }
        const model = this.model.find(queryOptions).sort({date: -1})

        if(data.limit) {
            model.limit(data.limit)
        }

        return model.exec()
    }

    onModuleInit() {
        this.chatClient.subscribeToResponseOf(KAFKA_TOPICS.chat);
    }

}
