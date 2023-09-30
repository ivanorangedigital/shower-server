import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";

// gen unique hash
const genUniqueHash = (originalname: string, ext: string): string => {
    return `${originalname.split(new RegExp(`\.${ext}$`))[0]}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
}

// define file storage
const storage = (path: string) => diskStorage({
    destination(req, file, cb) {
        cb(null, path);
    },
    filename(req, file, cb) {
        cb(null, genUniqueHash(file.originalname, req['ext']));
    }
});

// multer options
export const multerOptions = (allowedExtensions: string[], path: string) => ({
    fileFilter(req, file, cb) {
        // get file ext and check if allowed
        const ext = allowedExtensions.includes(file.mimetype.split('/')[1]) ? file.mimetype.split('/')[1] : null;

        // if no ext return error
        if (!ext) return cb(new HttpException('estensione non valida', HttpStatus.BAD_REQUEST), false);

        // assign ext to request object
        req['ext'] = ext;

        cb(null, true);
    },
    storage: storage(path)
})