import { Module } from '@nestjs/common'
import { TrackModule } from './track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track/track.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "cepit",
      database: "musicadb",
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [Track],
      synchronize: true
    })
    , TrackModule]
})
export class AppModule { }
