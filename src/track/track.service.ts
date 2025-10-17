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


    async getById(id: string): Promise<Track | Object> {
        const res = await fetch(`${BASE_URL}/${id}`)
        if (!res.ok) {
            return {}
        } else {
            const track = await res.json()
            return track
        }

    }

    async createOne(track: Track): Promise<any> {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(track)
        })
        const endResponse = res.json()
        return endResponse
    }

    async deleteOne(id: string): Promise<any> {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',

        })
        const endResponse = res.json()
        return endResponse
    }

    //CON PUT
    /* async updateOne(id: string, body: Track): Promise<any> {
        const isTrack = await this.getById(id)
        if (!Object.keys(isTrack).length) return

        const updatedTrack = { ...body, id }
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(updatedTrack)

        })
        const endResponse = res.json()
        return endResponse
    }
    */

    //CON PATCH
    async updateOne(id: string, body: Track): Promise<any> {
        const isTrack = await this.getById(id)
        if (!Object.keys(isTrack).length) return

        const updatedTrack = { ...body, id }
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(updatedTrack)

        })
        const endResponse = res.json()
        return endResponse
    }
}
