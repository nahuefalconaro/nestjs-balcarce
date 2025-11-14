import { Controller, Get, Param, Post, Body, Delete, Put, Patch, HttpCode, Res, HttpStatus } from '@nestjs/common'
import { TrackService } from './track.service'

import { TrackDTO } from './dto/track.dto'
import { ResponseDTO } from './dto/response.dto'
import { Track } from './entities/track.entity'


@Controller('tracks')
export class TrackController {

    constructor(private readonly trackService: TrackService) { }

    // @Get()
    // getAll(): Promise<ResponseDTO> {
    //     return this.trackService.getAll()
    // }

    // @Get(':id')
    // getOneById(@Param('id') id: number): Promise<ResponseDTO> {
    //     return this.trackService.getOneById(id)
    // }

    @Post()
    createOne(@Body() createTrack: TrackDTO): Promise<Track> {
        return this.trackService.createOne(createTrack)
    }
    // @Delete(':id')
    // deleteOne(@Param('id') id: number): Promise<ResponseDTO> {
    //     return this.trackService.deleteOne(id)
    // }



    // @Patch(':id')
    // updateOne(@Param('id') id: number, @Body() body: Partial<TrackDTO>): Promise<ResponseDTO> {
    //     return this.trackService.updateOne(id, body)
    // }
}

