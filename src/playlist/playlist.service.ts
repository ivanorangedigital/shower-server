import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlaylistDto, PlaylistUpdateDto, PlaylistUpdateNameDto } from "src/dto/playlist.dto";
import { Gateway } from "src/gateway";
import { Playlist } from "src/schemas/playlist.schema";
import { ScreenService } from "src/screen/screen.service";

@Injectable()
export default class PlaylistService {
    constructor(@InjectModel('Playlist') private readonly playlistModel: Model<Playlist>, private readonly gateway: Gateway, private readonly screenService: ScreenService) { }

    async getPlaylists(): Promise<Playlist[]> {
        return this.playlistModel
            .find()
            .populate('content')
            .exec()
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_GATEWAY)
            })
    }

    async getPlaylistById(id: string): Promise<Playlist> {
        return this.playlistModel
            .findById(id)
            .populate('content')
            .exec();
    }

    async createPlaylist(playlist: PlaylistDto): Promise<Playlist> {
        return new this.playlistModel(playlist).save().catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
    }

    async deletePlaylist(id: string): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(id);
        return playlist.deleteOne().then(async res => {
            const screens = await this.screenService.getScreensByPlaylistId(id);

            for (const screen of screens) {
                this.emitEvent(screen.toJSON().id.toString());                
            };

            return res;
        });
    }

    async updatePlaylist(data: PlaylistUpdateDto): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(data.id).exec();        

        // update playlist name
        playlist.name = data.name ?? playlist.name;

        // add content to playlist
        if (data.type === 'push') {
            (playlist.content as string[]).push(data.content);

            return playlist.save().then(async res => {
                const screens = await this.screenService.getScreensByPlaylistId(data.id);

                for (const screen of screens) {
                    this.emitEvent(screen.toJSON().id.toString());                
                };

                return res.populate('content');
            });
        }

        // remove content from playlist
        const index = (playlist.content as string[]).findIndex(id => id.toString() === data.content);        
        playlist.content.splice(index, 1);        

        return playlist.save().then(async res => {
            const screens = await this.screenService.getScreensByPlaylistId(data.id);

            for (const screen of screens) {
                this.emitEvent(screen.toJSON().id.toString());            
            };

            return res.populate('content');
        });
    }

    async updatePlaylistName(data: PlaylistUpdateNameDto): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(data.id);

        // update playlist name
        playlist.name = data.name;

        return playlist.save().catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
    }

    private emitEvent(id: string) {
        this.gateway.server.to(id).emit('update');
    }
}