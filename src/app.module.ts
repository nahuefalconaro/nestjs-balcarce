import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TrackModule } from './track/track.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtistModule } from './artist/artist.module'
import { AlbumModule } from './album/album.module'
import { Track } from './track/entities/track.entity'
import { Album } from './album/entities/album.entity'
import { Artist } from './artist/entities/artist.entity'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Track, Album, Artist],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //OJITO, está bien en dev, pero no en prod. -> se usan migraciones
      logging: ['info', 'log', 'warn', 'error'],
      connectTimeout: 10000
    })
    , TrackModule, ArtistModule, AlbumModule]
})
export class AppModule { }
