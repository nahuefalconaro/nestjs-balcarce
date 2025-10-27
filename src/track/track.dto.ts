import { IsString, IsNumber } from 'class-validator'
export class TrackDTO {
    @IsString()
    title: string
    @IsString()
    duration: string
    @IsString()
    artist: string
    @IsString()
    album: string
    @IsNumber()
    year: number
    @IsString()
    genre: string
}