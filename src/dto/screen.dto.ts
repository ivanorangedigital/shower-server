import { IsOptional, IsString, Length, Matches } from "class-validator";

export class ScreenDto {
    @IsString()
    name: string;

    @IsString({ each: true })
    playlist: string[];

    @IsString()
    background: string;
}

export class ScreenUpdateDto {
    @IsString()
    id: string;

    @IsOptional()
    name: string;

    @IsOptional()
    background: string;

    @IsString()
    playlist: string;

    @Matches(/^(push|pull)$/)
    type: 'push' | 'pull';
}

export class ScreenUpdateNameOrBackgroundDto {
    @IsString()
    id: string;

    @IsString({ each: true })
    nameOrBackground: string[];
}