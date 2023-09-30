import { Module } from '@nestjs/common';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreenSchema } from 'src/schemas/screen.schema';
import GatewayModule from 'src/gateway.module';

@Module({
  controllers: [ScreenController],
  imports: [MongooseModule.forFeature([{ name: 'Screen', schema: ScreenSchema, collection: 'screens' }]), GatewayModule],
  providers: [ScreenService],
  exports: [ScreenService]
})
export class ScreenModule {}
