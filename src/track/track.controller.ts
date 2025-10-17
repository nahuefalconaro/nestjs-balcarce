import { Controller, Get, Param, Post, Body, Delete, Put, Patch } from '@nestjs/common'
import { TrackService } from './track.service'
import { type Track } from './track.interface'
import { randomUUID } from 'crypto'

@Controller('tracks')
export class TrackController {

    constructor(private readonly trackService: TrackService) { }

    @Get()
    getTracks(): Promise<Track[]> {
        return this.trackService.getTracks()
    }


    @Get(':id')
    getById(@Param('id') id: string): Promise<Track | Object> {
        return this.trackService.getById(id)
    }

    @Post()
    createOne(@Body() track: Track): Promise<any> {
        return this.trackService.createOne(track)
    }
    @Delete(':id')
    deleteOne(@Param('id') id: string): Promise<any> {
        return this.trackService.deleteOne(id)
    }

    // @Put(':id')
    // updateOne(@Param('id') id: string, @Body() body: Track): Promise<any> {
    //     return this.trackService.updateOne(id, body)
    // }

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() body: Track): Promise<any> {
        return this.trackService.updateOne(id, body)
    }
}

