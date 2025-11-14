import { Controller, Post, Body, Get } from '@nestjs/common'
import { ArtistService } from './artist.service'
import { ArtistDto } from './dto/artist.dto'
// import { ResponseDTO } from './dto/response.dto'
import { Artist } from './entities/artist.entity'

@Controller('artists')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }


    // @Get()
    // getAll(): Promise<Artist[]> {
    //     return this.artistService.getAll()
    // }

    @Post()
    createOne(@Body() createArtist: ArtistDto): Promise<Artist> {
        return this.artistService.createOne(createArtist)
    }
}
