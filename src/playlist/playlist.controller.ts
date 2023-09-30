import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import PlaylistService from "./playlist.service";
import { PlaylistDto, PlaylistUpdateDto, PlaylistUpdateNameDto } from "src/dto/playlist.dto";
import { Playlist } from "src/schemas/playlist.schema";

@Controller('playlist')
export default class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @Get()
    async getPlaylists(): Promise<Playlist[]> {
        return this.playlistService.getPlaylists();
    }

    @Get(':id')
    async getPlaylistById(@Param('id') id: string): Promise<Playlist> {
        return this.playlistService.getPlaylistById(id);
    }

    @Post('create')
    async createPlaylist(@Body() data: PlaylistDto): Promise<Playlist> {
        return this.playlistService.createPlaylist(data);
    }

    @Delete('delete/:id')
    async deletePlaylist(@Param('id') id: string): Promise<Playlist> {
        return this.playlistService.deletePlaylist(id);
    }

    @Put('update')
    async updatePlaylist(@Body() data: PlaylistUpdateDto): Promise<Playlist> {
        return this.playlistService.updatePlaylist(data);
    }

    @Put('update-name')
    async updatePlaylistName(@Body() data: PlaylistUpdateNameDto): Promise<Playlist> {
        return this.playlistService.updatePlaylistName(data);
    }
}