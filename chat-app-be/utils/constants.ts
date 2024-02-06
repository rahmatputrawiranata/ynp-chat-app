export const KAFKA_BROKER = "localhost:19092";
export const KAFKA_CLIENT_ID = "chat-sender";
export const KAFKA_CLIENT_ID_REPLY = "chat-reply-sender";
export const KAFKA_GROUP_ID = "chat-consumer";
export const KAFKA_TOPICS = {
    chat: "chat",
    chatReply: "chat.reply"
}
export const JWT_SECRET="secretquickchatapp";