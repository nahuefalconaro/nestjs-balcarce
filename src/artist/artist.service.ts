import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ArtistDto } from './dto/artist.dto'
import { Artist } from './entities/artist.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
// import { ResponseDTO } from './dto/response.dto' -> esto está bien, pero ahora, para mayor claridad, vamos a retornar directamente la entidad que corresponda

@Injectable()
export class ArtistService {

    constructor(@InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>) { }

    async createOne(artist: ArtistDto): Promise<Artist> {
        try {
            const newArtist = this.artistRepository.create(artist)
            return await this.artistRepository.save(newArtist)
        } catch (error) {
            // Manejar error de duplicado (unique constraint)
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                throw new ConflictException(`Artist with name "${artist.name}" already exists`)
            }

            // Manejar otros errores de base de datos
            if (error.code === 'ER_DATA_TOO_LONG') {
                throw new ConflictException('One or more fields exceed maximum length')
            }

            throw new InternalServerErrorException("Failed to create artist")
        }
    }
    // async getAll(): Promise<Artist[]> {
    //     return
    // }
}
