import { Album } from "../entities/album.entity"


export interface ResponseDTO {
    code: number
    message: string
    data?: Album | Album[]
}