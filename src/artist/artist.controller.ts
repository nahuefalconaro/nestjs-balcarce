import { Controller, Post, Body, Get } from '@nestjs/common'
import { ArtistService } from './artist.service'
import { ArtistDto } from './dto/artist.dto'
import { ResponseDTO } from './dto/response.dto'

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }


    @Get()
    getAll(): Promise<ResponseDTO> {
        return this.artistService.getAll()
    }

    @Post()
    createOne(@Body() createArtist: ArtistDto): Promise<ResponseDTO> {
        return this.artistService.createOne(createArtist)
    }
}
