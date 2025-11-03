import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { TrackDTO } from './track.dto'
import { Track } from './track.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ResponseDTO } from './track.response.dto'




@Injectable()
export class TrackService {
    constructor(@InjectRepository(Track) private readonly trackRepository: Repository<Track>) { }

    async getAll(): Promise<ResponseDTO> {
        const tracks = await this.trackRepository.find()
        if (!tracks.length) throw new NotFoundException("Tracks not found")
        return {
            code: HttpStatus.OK,
            message: 'Tracks retrieved successfully',
            data: tracks
        }
    }

    async getOneById(id: number): Promise<ResponseDTO> {
        const track = await this.trackRepository.findOneBy({ id })
        if (!track) throw new NotFoundException("Tracks not found")
        return {
            code: HttpStatus.OK,
            message: 'Track retrieved successfully',
            data: track
        }
    }

    //TODO Crear método para buscar por título, o autor, o ambos

    async createOne(track: TrackDTO): Promise<ResponseDTO> {
        const newTrack = this.trackRepository.create(track)
        const res = await this.trackRepository.save(newTrack)

        return {
            code: HttpStatus.CREATED,
            message: 'Track retrieved successfully',
            data: res
        }
    }

    async deleteOne(id: number): Promise<ResponseDTO> {
        const res = await this.trackRepository.delete({ id })
        if (!res.affected) throw new NotFoundException(`No track with id ${id} were found`)
        return {
            code: HttpStatus.OK,
            message: 'Track deleted successfully',

        }
    }

    //CON PATCH
    async updateOne(id: number, body: Partial<TrackDTO>): Promise<ResponseDTO> {
        const res = await this.trackRepository.update(id, body)
        if (!res.affected) throw new NotFoundException(`No track with id ${id} were found`)
        return {
            code: HttpStatus.NO_CONTENT,
            message: 'Track updated successfully',

        }
    }
}
