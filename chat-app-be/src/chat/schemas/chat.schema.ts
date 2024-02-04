import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatDocument = Chat & Document;

@Schema({timestamps: true})
export class Chat {
    @Prop({required: true})
    message: string;
    @Prop({required: true})
    username: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);