import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScreenDto, ScreenUpdateDto, ScreenUpdateNameOrBackgroundDto } from 'src/dto/screen.dto';
import { Screen } from './../schemas/screen.schema';
import { Gateway } from 'src/gateway';

const POPULATE = [
    {
        path: 'playlist',
        populate: 'content'
    },
    {
        path: 'background'
    }
];

@Injectable()
export class ScreenService {
    constructor(@InjectModel('Screen') private readonly screenModel: Model<Screen>, private readonly gateway: Gateway) { }

    async getScreens(): Promise<Screen[]> {
        return this.screenModel
            .find()
            .populate(POPULATE)
            .exec();
    }

    async getScreenById(id: string): Promise<Screen> {
        return this.screenModel
            .findById(id)
            .populate(POPULATE)
            .exec();
    }

    async getScreensByPlaylistId(playlist: string): Promise<Screen[]> {
        return this.screenModel
            .find({
                playlist
            })
            .exec()
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })
    }

    async createScreen(screen: ScreenDto): Promise<Screen> {
        return new this.screenModel(screen).save();
    }

    /*     async deleteScreen(id: string): Promise<Screen> {
            const screen = await this.screenModel.findById(id);
            return screen.deleteOne().catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });
        } */

    async updateScreen(data: ScreenUpdateDto): Promise<Screen> {
        const screen = await this.screenModel.findById(data.id).exec();

        // update screen name
        screen.name = data.name ?? screen.name;

        // udpate screen background
        screen.background = data.background ?? screen.background;

        // add playlist to screen
        if (data.type === 'push') {
            (screen.playlist as string[]).push(data.playlist);

            return screen.save().then(res => {
                this.emitEvent(data.id);
                return res;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        }

        // remove content from Screen
        const index = (screen.playlist as string[]).findIndex(id => id.toString() === data.playlist);
        screen.playlist.splice(index, 1);

        return screen.save()
            .then(res => {
                this.emitEvent(data.id);
                return res;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
    }

    async updateScreenNameOrBackgorund(data: ScreenUpdateNameOrBackgroundDto): Promise<Screen> {
        const screen = await this.screenModel.findById(data.id);

        // get name or background
        const [name, background] = data.nameOrBackground;

        // check if something exist
        if (name) screen.name = name;
        if (background) screen.background = background;

        return screen.save()
            .then(async res => {
                this.emitEvent(data.id);
                return res
            });
    }

    private emitEvent(id: string) {
        this.gateway.server.to(id).emit('update');
    }
}
