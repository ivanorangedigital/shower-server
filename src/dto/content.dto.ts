import { IsString } from "class-validator";

export class ContentDto {
    @IsString()
    name: string;
}