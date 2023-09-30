import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { Screen } from 'src/schemas/screen.schema';
import { ScreenDto, ScreenUpdateDto, ScreenUpdateNameOrBackgroundDto } from 'src/dto/screen.dto';

@Controller('screen')
export class ScreenController {
    constructor(private readonly screenService: ScreenService) { }

    @Get()
    async getScreens(): Promise<Screen[]> {
        return this.screenService.getScreens();
    }

    @Get(':id')
    async getScreenById(@Param('id') id: string): Promise<Screen> {
        return this.screenService.getScreenById(id);
    }

    @Get('playlist/:id')
    async getScreensByPlaylistId(@Param('id') id: string): Promise<Screen[]> {
        return this.screenService.getScreensByPlaylistId(id);
    }

    @Post('create')
    async createScreen(@Body() data: ScreenDto): Promise<Screen> {
        return this.screenService.createScreen(data);
    }

/*     @Delete('delete/:id')
    async deleteScreen(@Param('id') id: string): Promise<Screen> {
        return this.screenService.deleteScreen(id);
    } */

    @Put('update')
    async updateScreen(@Body() data: ScreenUpdateDto): Promise<Screen> {
        return this.screenService.updateScreen(data);
    }

    @Put('update-name-background')
    async updateScreenName(@Body() data: ScreenUpdateNameOrBackgroundDto): Promise<Screen> {
        return this.screenService.updateScreenNameOrBackgorund(data);
    }
}
