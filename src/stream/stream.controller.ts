import { Controller, Get, Header, HttpStatus, Param, Res, Headers } from '@nestjs/common';
import { statSync, createReadStream } from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { CONTENT_PATH } from 'src/paths/content.path';

@Controller('stream')
export class StreamController {
    @Get(':name')
    @Header('Accept-Ranges', 'bytes')
    async getStreamVideo(@Param('name') name: string, @Headers('range') videoRange: string, @Res() res: Response) {
        if (!videoRange || !name) return res.send('need video range');

        const videoPath = join(CONTENT_PATH, name);
        const mimetype = name.split('.').reverse()[0];

        const { size: videoSize } = statSync(videoPath);

        // split range header
        let [start, end]: string[] | number[] = videoRange.replace(/bytes=/, '').split('-');

        // get the starting byte from req header's range
        start = parseInt(start);

        // decide the end byte considering chunk size
        end = end ? parseInt(end, 10) : videoSize - 1;

        // calculate content length
        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Content-Length": contentLength,
            "Content-Type": `video/${mimetype === 'mp4' ? 'mp4' : 'quicktime'}`,
        };

        // create a read stream and pipe it ro the res object
        const videoStream = createReadStream(videoPath, { start, end });

        res.writeHead(206, headers);
        videoStream.pipe(res);
    }
}
