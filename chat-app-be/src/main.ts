import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_GROUP_ID } from 'utils';

const microServiceConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: KAFKA_BROKER.split(',')
    },
    consumer: {
      groupId: KAFKA_GROUP_ID
    }
  },
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  

  app.connectMicroservice(microServiceConfig);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
