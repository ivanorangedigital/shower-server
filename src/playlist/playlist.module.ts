import { Module } from "@nestjs/common";
import PlaylistController from "./playlist.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistSchema } from "src/schemas/playlist.schema";
import PlaylistService from "./playlist.service";
import { Gateway } from "src/gateway";
import { ScreenModule } from "src/screen/screen.module";
import GatewayModule from "src/gateway.module";

@Module({
    controllers: [PlaylistController],
    imports: [MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema, collection: 'playlists' }]), ScreenModule, GatewayModule],
    providers: [PlaylistService]
})
export default class PlaylistModule { }