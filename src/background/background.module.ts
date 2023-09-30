import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BackgroundSchema } from 'src/schemas/background.schema';

@Module({
  providers: [BackgroundService],
  imports: [MongooseModule.forFeature([{ name: 'Background', schema: BackgroundSchema, collection: 'backgrounds' }])],
  controllers: [BackgroundController]
})
export class BackgroundModule {}
