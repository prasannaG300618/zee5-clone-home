import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
 let port = process.env.PORT ?? 3000;
  await app.listen(process.env.PORT ?? 3000, ()=>{console.log("App listing ",port)});
}
bootstrap();
