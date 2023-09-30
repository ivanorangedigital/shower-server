import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentDto } from 'src/dto/content.dto';
import { Content } from 'src/schemas/content.schema';
import { unlink } from 'fs';
import { CONTENT_PATH } from 'src/paths/content.path';
import { join } from 'path';

@Injectable()
export class ContentService {
    constructor(@InjectModel('Content') private readonly contentModel: Model<Content>) { }

    async getContents(): Promise<Content[]> {
        return this.contentModel
            .find()
            .exec();
    }

    async uploadFiles(content: ContentDto[]): Promise<Content[]> {
        return this.contentModel.insertMany(content).catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
    }

    async deleteFile(id: string): Promise<Content> {
        const content = await this.contentModel.findById(id);

        // check if there is a content
        if (!content) throw new HttpException('content not found', HttpStatus.BAD_REQUEST)

        // get filename from content
        const { name } = content;
        
        // delete file from folder
        unlink(join(CONTENT_PATH, name), err => {            
            if (err) throw new HttpException('file not found', HttpStatus.BAD_REQUEST)
        });

        // delete file from database
        return content.deleteOne();
    }
}
