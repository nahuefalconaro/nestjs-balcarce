import { Track } from "../entities/track.entity"

export interface ResponseDTO {
    code: number
    message: string
    data?: Track | Track[]
}