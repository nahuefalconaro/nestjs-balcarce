import { TypeOrmModule } from '@nestjs/typeorm'
import { Track } from './entities/track.entity'
import { Module } from '@nestjs/common'
import { TrackController } from './track.controller'
import { TrackService } from './track.service'
import { ArtistModule } from 'src/artist/artist.module'
import { AlbumModule } from 'src/album/album.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Track]),
        ArtistModule,
        AlbumModule
    ],
    controllers: [TrackController],
    providers: [TrackService],
    exports: [TrackService, TypeOrmModule]
})
export class TrackModule { }
