import { Artist } from "../entities/artist.entity"

export interface ResponseDTO {
    code: number
    message: string
    data?: Artist | Artist[]
}