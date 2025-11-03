import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ResponseDTO } from './dto/response.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {

  constructor(@InjectRepository(Album) private readonly albumRepository: Repository<Album>) { }


  async findAll(): Promise<ResponseDTO> {
    const artist = await this.albumRepository.find({
      relations: {
        tracks: true
      }
    })
    if (!artist.length) throw new NotFoundException("Albums not found")
    return {
      code: HttpStatus.OK,
      message: 'Album retrieved successfully',
      data: artist
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
