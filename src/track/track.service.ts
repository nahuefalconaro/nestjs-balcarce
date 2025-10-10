import { Injectable } from '@nestjs/common'
import { Track } from './track.interface'
const BASE_URL = 'http://localhost:3001/tracks'
@Injectable()
export class TrackService {
    async getTracks(): Promise<Track[]> {
        const res = await fetch(BASE_URL)
        const tracks = await res.json()
        return tracks
    }


    async getById(id: number): Promise<Track | string> {
        const res = await fetch(`${BASE_URL}/${id}`)
        if (!res.ok) {
            console.log("Recurso no encontrado")
            return "Recurso no encontrado"

        } else {
            const track = await res.json()
            return track
        }

    }
}
