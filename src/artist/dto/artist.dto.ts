import { PartialType } from "@nestjs/mapped-types"
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator"

export class ArtistDto {
    @IsString()
    @MaxLength(255)
    name: string

    @IsString()
    @IsOptional()
    bio?: string

    @IsString()
    @IsOptional()
    @MaxLength(100)
    country?: string

    @IsUrl()
    @IsOptional()
    imageUrl?: string

    @IsString()
    @IsOptional()
    @MaxLength(50)
    genre?: string

    @IsString()
    pais: string
}

export class UpdateArtistDto extends PartialType(ArtistDto) { }

//PartialType mantiene todos los decoradores de validación pero hace las props opcionales, ideal para PATCH
