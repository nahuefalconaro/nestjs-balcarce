import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common'
import { TrackService } from './track.service'
import { Track } from './track.interface'

@Controller('tracks')
export class TrackController {

    constructor(private readonly trackService: TrackService) { }

    @Get()
    getTracks(): Promise<Track[]> {
        return this.trackService.getTracks()
    }

    @Post('body')
    findAll(@Req() request: Request): string {
        return request.body!.toString()
    }

    @Get('headers')
    findAllHeaders(@Req() request: Request): string {
        return JSON.stringify(request.headers)
    }

    @Get('query')
    findAllQuery(@Query() query: any): string {
        return JSON.stringify(query)
    }

    //Esto no debería retornar un string "no encontrado" sino una respuesta estándar. Pero es mejor que no retornar nada cuando el recurso no se encuentra. Lo trabajaremos a continuación...
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Track | string> {
        return this.trackService.getById(Number(id))
    }
}
