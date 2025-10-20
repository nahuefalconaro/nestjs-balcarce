import { Controller, Get, Param, Post, Body, Delete, Put, Patch, HttpCode, Res, HttpStatus } from '@nestjs/common'
import { TrackService } from './track.service'
import { type Track } from './track.interface'
import { type Response } from 'express';

interface ResponseDTO {
    code: number;
    message: string;
    data?: any;
}

@Controller('tracks')
export class TrackController {

    constructor(private readonly trackService: TrackService) { }

    @Get()
    async getTracks(@Res() res: Response): Promise<any> {
        const response: ResponseDTO = await this.trackService.getTracks();
        res.status(response.code).json(response.data);
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

