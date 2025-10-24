import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //elimina propiedades no incluidas en el DTO
    forbidNonWhitelisted: true //Más restrictivo. Si hay props que no están en el DTO, lanza excepción
  }))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
