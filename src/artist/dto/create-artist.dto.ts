import { IsString } from "class-validator"

export class CreateArtistDto {
    @IsString()
    nombre: string
    @IsString()
    genero: string
    @IsString()
    pais: string
}
