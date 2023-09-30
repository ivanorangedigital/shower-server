import { IsString } from "class-validator";

export class BackgroundDto {
    @IsString()
    name: string;
}