import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO } from './dto/response.dto';

@Injectable()
export class ArtistService {

    constructor(@InjectRepository(Artist) private readonly artistRepository: Repository<Artist>) { }
    
    async createOne(track: CreateArtistDto): Promise<ResponseDTO> {
        const newTrack = this.artistRepository.create(track)
        const res = await this.artistRepository.save(newTrack)

        return {
            code: HttpStatus.CREATED,
            message: 'Track retrieved successfully',
            data: res
        }
    }

        async getAll(): Promise<ResponseDTO> {
            const artist = await this.artistRepository.find()
            if (!artist.length) throw new NotFoundException("Tracks not found")
            return {
                code: HttpStatus.OK,
                message: 'Artist retrieved successfully',
                data: artist
            }
        }
}
