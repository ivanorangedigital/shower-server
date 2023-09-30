import { Controller, UseInterceptors, Post, UploadedFiles, HttpException, HttpStatus, Delete, Param, Get } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ContentService } from './content.service';
import { CONTENT_PATH } from 'src/paths/content.path';
import { multerOptions } from 'src/services/upload';
import { Content } from 'src/schemas/content.schema';

// allowed extensions
const ALLOWED_EXTENSIONS = ['mp4', 'mov'];

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Get()
    async getContents(): Promise<Content[]> {
        return this.contentService.getContents();
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 10, multerOptions(ALLOWED_EXTENSIONS, CONTENT_PATH)))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<Content[]> {
        const content = files.map(f => ({ name: f.filename }));
        return this.contentService.uploadFiles(content);
    }

    @Delete('delete/:id')
    async deleteFile(@Param('id') id: string): Promise<Content> {
        return this.contentService.deleteFile(id);
    }
}
