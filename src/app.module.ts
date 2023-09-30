import { Module } from '@nestjs/common';
import AppController from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './content/content.module';
import { BackgroundModule } from './background/background.module';
import { ScreenModule } from './screen/screen.module';
import { StreamModule } from './stream/stream.module';
import PlaylistModule from './playlist/playlist.module';
import { Gateway } from './gateway';
import GatewayModule from './gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService]
    }),
    PlaylistModule,
    ContentModule,
    BackgroundModule,
    ScreenModule,
    StreamModule,
    GatewayModule
  ],
  controllers: [
    AppController
  ]
})
export class AppModule {}
