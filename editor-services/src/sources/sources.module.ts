import { Module } from '@nestjs/common';
import { SourcesController } from './sources.controller';
import { SourcesServiceModule } from 'src/sources-service/sources-service.module';

@Module({
  controllers: [SourcesController],
  imports: [SourcesServiceModule],
  providers: [],
  exports:[]
})
export class SourcesModule { }
