import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getWelcome() {
    return "Esta es la API. Acá podría ir el front..."
  }
  @Get("docs")
  getDocs(@Query('version') version: String) {
    return `Documentacion de la API en la version ${version}`
  }

}
