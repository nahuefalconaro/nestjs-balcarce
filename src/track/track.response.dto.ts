import { Track } from "./track.entity"

export interface ResponseDTO {
    code: number
    message: string
    data?: Track | Track[]
}