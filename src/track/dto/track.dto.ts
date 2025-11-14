import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsNumber, MaxLength, IsOptional, IsInt, Min, IsUrl, IsUUID, IsArray, ArrayMinSize } from 'class-validator'
export class TrackDTO {
    @IsString()
    @MaxLength(255)
    title: string

    @IsInt()
    @IsOptional()
    @Min(1)
    trackNumber?: number

    @IsNumber()
    @Min(1)
    duration: number

    @IsString()
    @IsOptional()
    @MaxLength(50)
    genre?: string

    @IsUrl()
    @IsOptional()
    audioUrl?: string

    @IsUUID('4')
    @IsOptional()
    albumId?: string

    @IsArray()
    // @IsUUID('4')
    @ArrayMinSize(1, { message: 'At least one artist is required' })
    artistIds: string[]

}

export class UpdateTrackDto extends PartialType(TrackDTO) { }