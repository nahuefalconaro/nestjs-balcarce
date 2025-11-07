import { PartialType } from "@nestjs/mapped-types"
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, IsUrl, IsUUID, Max, MaxLength, Min } from "class-validator"

export class AlbumDto {
    @IsString()
    @MaxLength(255)
    title: string

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    releaseYear: number


    @IsString()
    @IsOptional()
    @MaxLength(50)
    genre?: string

    @IsUrl()
    @IsOptional()
    coverUrl?: string


    @IsString()
    @IsOptional()
    description?: string

    @IsArray()
    @IsUUID('4', { each: true })
    @ArrayMinSize(1, { message: 'At least one artist is required' })
    artistIds: string[]
}

export class UpdateAlbumDto extends PartialType(AlbumDto) { }