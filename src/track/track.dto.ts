import { IsString, IsNumber } from 'class-validator'
export class TrackDTO {
    @IsString()
    title: string
    @IsNumber()
    duration: number
    @IsString()
    artist: string

}