import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from 'src/schemas/content.schema';

@Module({
  controllers: [ContentController],
  imports: [MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema, collection: 'contents' }])],
  providers: [ContentService]
})
export class ContentModule {}
