import { IsOptional, IsString, Matches } from "class-validator";

export class PlaylistDto {
    @IsString()
    name: string;

    @IsOptional()
    content: string[];
}

export class PlaylistUpdateDto {
    @IsString()
    id: string;

    @IsOptional()
    name: string;

    @IsString()
    content: string;

    @Matches(/^(push|pull)$/)
    type: 'push' | 'pull';
}

export class PlaylistUpdateNameDto {
    @IsString()
    id: string;

    @IsString()
    name: string;
}