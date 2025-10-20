import { HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common'
import { Track } from './track.interface'
import { MyExceptionCustom } from 'src/exceptions/MyExceptionCustom.exception';
const BASE_URL = 'http://localhost:3001/tracks'

interface ResponseDTO {
    code: number;
    message: string;
    data?: any;
}

@Injectable()
export class TrackService {


    async getTracks(): Promise<ResponseDTO> {
        try {
            const res = await fetch(BASE_URL)
            // const tracks = await res.json()
            const tracks: any = [];
            if (tracks.length === 0) throw new MyExceptionCustom('Tracks list is empty', HttpStatus.NOT_FOUND);
            return {
                code: HttpStatus.OK,
                message: 'Tracks retrieved successfully',
                data: tracks
            }
        }
        catch (error) {
            console.error("entro al catch", error);
            return {
                code: error.status,
                message: 'Tracks retrieved successfully',
                data: error
            }
        }

    }
    // async getTracks(): Promise<ResponseDTO> {
    //     const res = await fetch(BASE_URL)
    //     // const tracks = await res.json()
    //     const tracks:any = [];
    //     if (tracks.length === 0) {
    //         return {
    //             code: HttpStatus.NOT_FOUND,
    //             message: 'Tracks list is empty',
    //             data: []
    //         }
    //     } else {
    //         return {
    //             code: HttpStatus.OK,
    //             message: 'Tracks retrieved successfully',
    //             data: tracks
    //         }
    //     }
    // }


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
