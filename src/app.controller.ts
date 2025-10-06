import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService, Cancion } from './app.service';

@Controller("canciones")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Cancion[] {
    return this.appService.getCanciones();
  }

  @Post('body')
  findAll(@Req() request: Request): string {
    return request.body!.toString();
  }

  @Get('docs')
  getDocs(@Query('version') version: String) {
    return `Documentacion de la API en la version ${version}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Esta es la cancion ${this.appService.obtenerById(+id)?.nombre}`;
  }
}
