# YNP CHAT APP

## Description
This project is a chat application that utilizes MongoDB, NestJS, React, Socket.io, Kafka, and Redpanda for real-time messaging and event streaming.


## Prerequisites
- Docker
- Docker Compose

## Installation with docker
1. Clone the repository.
2. Navigate to the project directory.
3. Navigate to the `chat-app-be` directory
4. Copy `.env.example` to `.env.production`
5. Set `MONGO_URI` into `mongodb/chat-app`
6. Set `KAFKA_BROKERS` into `redpanda:9092`
7. Navigate to the `chat-app-fe` directory
8. Copy `.env.example` to `.env`
9. Run the following command to start the application:
    ```
    docker-compose up -d
    ```
10. Demo
https://jam.dev/c/b7e64df9-f5a7-4644-83b5-f5fdf8bb5257


## Contact
rahmatputrawiranata@gmail.com
