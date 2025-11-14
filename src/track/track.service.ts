import { BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { TrackDTO } from './dto/track.dto'
import { Track } from './entities/track.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
// import { ResponseDTO } from './dto/response.dto'
import { Artist } from 'src/artist/entities/artist.entity'
import { Album } from 'src/album/entities/album.entity'


@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track)
        private readonly trackRepository: Repository<Track>,
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
    ) { }
    async createOne(createTrack: TrackDTO): Promise<Track> {
        try {
            //1. Validar que hay un artista, al menos
            if (!createTrack.artistIds || createTrack.artistIds.length === 0) {
                throw new BadRequestException("At least one artist is required")
            }
            //2. Buscar y validar artista o artistas que entraron en el body
            const artists = await this.artistRepository.find({
                where: { artist_id: In(createTrack.artistIds) }
            })

            if (!artists.length) {
                //TODO: Verificar si es necesario ampliar la restricción
                throw new NotFoundException(`Artists not found`)
            }

            //3. Buscar y validar si el album (si me pasaron alguno) existe
            let album: Album | null = null
            if (createTrack.albumId) {
                album = await this.albumRepository.findOne({
                    where: { album_id: createTrack.albumId }
                })

                if (!album) {
                    throw new NotFoundException("Album Not Found")
                }
            }

            //4. Validar que el trackNumber no se repita en el álbum
            if (createTrack.trackNumber) {
                const existingTrack = await this.trackRepository.findOne({
                    where: {
                        album: { album_id: createTrack.albumId },
                        trackNumber: createTrack.trackNumber
                    }
                })
                if (existingTrack) {
                    throw new ConflictException("Track number already exists on that album")
                }
            }

            //5. Crear el track
            const { artistIds, albumId, ...trackData } = createTrack
            const track = this.trackRepository.create({
                ...trackData,
                artists,
                album: album as any
            })

            //6. Guardar en DB
            const savedTrack = await this.trackRepository.save(track)

            //7. Devolver el track con las relaciones cargadas
            const foundTrack = await this.trackRepository.findOne({
                where: { track_id: savedTrack.track_id },
                relations: ['artists', 'album']
            })
            if (!foundTrack) throw new NotFoundException("Track not found")
            return foundTrack

        } catch (error) {
            // relanzar errores personalizados
            if (error instanceof NotFoundException ||
                error instanceof BadRequestException ||
                error instanceof ConflictException) {
                throw error
            }
            throw new InternalServerErrorException("Failed to create track")

        }
    }
    // async getAll(): Promise<ResponseDTO> {
    //     const tracks = await this.trackRepository.find()
    //     if (!tracks.length) throw new NotFoundException("Tracks not found")
    //     return {
    //         code: HttpStatus.OK,
    //         message: 'Tracks retrieved successfully',
    //         data: tracks
    //     }
    // }
    async getOneById() { }
    async deleteOne() { }
    async updateOne() { }


    // async getAllTracksWithArtist(): Promise<ResponseDTO> {
    //     const tracks = await this.trackRepository.find({
    //         relations: {
    //             artist: true
    //         }
    //     })
    //     if (!tracks.length) throw new NotFoundException("Tracks not found")
    //     return {
    //         code: HttpStatus.OK,
    //         message: 'Tracks retrieved successfully',
    //         data: tracks
    //     }
    // }

    // async getTracksByArtist(artistId: number): Promise<ResponseDTO> {
    //     const tracks = await this.trackRepository.find({
    //         where: {
    //             artist: { id: artistId }
    //         },
    //         relations: {
    //             artist: true
    //         }
    //     })
    //     if (!tracks.length) throw new NotFoundException("Tracks not found for the given artist")
    //     return {
    //         code: HttpStatus.OK,
    //         message: 'Tracks retrieved successfully',
    //         data: tracks
    //     }
    // }


    // async getOneById(id: number): Promise<ResponseDTO> {
    //     const track = await this.trackRepository.findOneBy({ id })
    //     if (!track) throw new NotFoundException("Tracks not found")
    //     return {
    //         code: HttpStatus.OK,
    //         message: 'Track retrieved successfully',
    //         data: track
    //     }
    // }

    // //TODO Crear método para buscar por título, o autor, o ambos

    // async createOne(track: TrackDTO): Promise<ResponseDTO> {
    //     const newTrack = this.trackRepository.create(track)
    //     const res = await this.trackRepository.save(newTrack)

    //     return {
    //         code: HttpStatus.CREATED,
    //         message: 'Track retrieved successfully',
    //         data: res
    //     }
    // }

    // async deleteOne(id: number): Promise<ResponseDTO> {
    //     const res = await this.trackRepository.delete({ id })
    //     if (!res.affected) throw new NotFoundException(`No track with id ${id} were found`)
    //     return {
    //         code: HttpStatus.OK,
    //         message: 'Track deleted successfully',

    //     }
    // }

    // //CON PATCH
    // async updateOne(id: number, body: Partial<TrackDTO>): Promise<ResponseDTO> {
    //     const res = await this.trackRepository.update(id, body)
    //     if (!res.affected) throw new NotFoundException(`No track with id ${id} were found`)
    //     return {
    //         code: HttpStatus.NO_CONTENT,
    //         message: 'Track updated successfully',

    //     }
    // }
}
