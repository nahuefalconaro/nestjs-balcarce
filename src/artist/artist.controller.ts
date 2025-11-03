import { Controller, Post, Body, Get} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ResponseDTO } from './dto/response.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}


    @Get()
    getAll(): Promise<ResponseDTO> {
        return this.artistService.getAll();
    }

    @Post()
    createOne(@Body() createArtist: CreateArtistDto): Promise<ResponseDTO> {
        return this.artistService.createOne(createArtist)
    }
}
