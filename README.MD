# YNP CHAT APP

## Description
This project is a chat application that utilizes MongoDB, NestJS, React, Socket.io, Kafka, and Redpanda for real-time messaging and event streaming.

## Demo
https://jam.dev/c/b7e64df9-f5a7-4644-83b5-f5fdf8bb5257

## Prerequisites
- Docker
- Docker Compose

## Installation with docker for dev environment
1. Clone the repository.
2. Navigate to the project directory.
3. Navigate to the `docker/dev` directory
4. Run the following command to start the application:
    ```
    docker-compose up -d
    ```
5. Navigate to the `chat-app-be` directory
6. Copy `.env.example` to `.env.development`
7. Set `MONGO_URI` into `localhost/chat-app`
8. Set `KAFKA_BROKERS` into `localhost:9092`
9. Run `yarn start:dev`
10. Navigate to the `chat-app-fe` directory
11. Copy `.env.example` to `.env`
12. Run `yarn dev`
13. Open through browser with address `localhost:5173`

## Installation with docker for prod environment
1. Clone the repository.
2. Navigate to the project directory.
3. Navigate to the `chat-app-be` directory
4. Copy `.env.example` to `.env.production`
5. Set `MONGO_URI` into `mongodb/chat-app`
6. Set `KAFKA_BROKERS` into `redpanda:9092`
7. Navigate to the `chat-app-fe` directory
8. Copy `.env.example` to `.env`
9. Navigate to the `docker` directory
10. Run the following command to start the application:
    ```
    docker-compose up -d
    ```
11. Open through browser with address `localhost`

## Contact
rahmatputrawiranata@gmail.com