import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { IMG_PATH } from 'src/paths/content.path';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/services/upload';
import { Background } from 'src/schemas/background.schema';

const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg'];

@Controller('background')
export class BackgroundController {
    constructor(private readonly backgroundService: BackgroundService) { }

    @Get()
    async getBackgrounds(): Promise<Background[]> {
        return this.backgroundService.getBackgrounds();
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerOptions(ALLOWED_EXTENSIONS, IMG_PATH)))
    async uploadFiles(@UploadedFile() file: Express.Multer.File): Promise<Background> {
        const name = file.filename;
        return this.backgroundService.uploadFile({ name });
    }

    @Delete('delete/:id')
    async deleteFile(@Param('id') id: string): Promise<Background> {
        return this.backgroundService.deleteFile(id);
    }
}
