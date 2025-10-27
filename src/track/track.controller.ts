import { Controller, Get, Param, Post, Body, Delete, Put, Patch, HttpCode, Res, HttpStatus } from '@nestjs/common'
import { TrackService } from './track.service'
import { Track } from './track.entity'
import { type Response } from 'express'
import { TrackDTO } from './track.dto'

interface ResponseDTO {
    code: number
    message: string
    data?: any
}

@Controller('tracks')
export class TrackController {

    constructor(private readonly trackService: TrackService) { }

    @Get()
    async getTracks(@Res() res: Response): Promise<any> {
        const response: ResponseDTO = await this.trackService.getTracksDB()
        res.status(response.code).json(response.data)
    }


    @Get(':id')
    async getById(@Res() res: Response, @Param('id') id: string): Promise<any> {
        const response: ResponseDTO = await this.trackService.getById(id)
        res.status(response.code).json(response.data)
    }

    @Post()
    createOne(@Body() trackDTO: TrackDTO): Promise<any> {
        return this.trackService.createOne(trackDTO)
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

