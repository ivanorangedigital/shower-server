import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { BackgroundDto } from 'src/dto/background';
import { IMG_PATH } from 'src/paths/content.path';
import { Background } from 'src/schemas/background.schema';

@Injectable()
export class BackgroundService {
    constructor(@InjectModel('Background') private readonly backgroundModel: Model<Background>) {}

    async getBackgrounds(): Promise<Background[]> {
        return this.backgroundModel
            .find()
            .exec();
    }

    async uploadFile(data: BackgroundDto): Promise<Background> {
        return new this.backgroundModel(data).save();
    }

    async deleteFile(id: string): Promise<Background> {
        const background = await this.backgroundModel.findById(id);

        // check if there is a background
        if (!background) throw new HttpException('content not found', HttpStatus.BAD_REQUEST)

        // get filename from background
        const { name } = background;
        
        // delete file from folder
        unlink(join(IMG_PATH, name), err => {            
            if (err) throw new HttpException('file not found', HttpStatus.BAD_REQUEST)
        });

        // delete file from database
        return background.deleteOne();
    }
}
