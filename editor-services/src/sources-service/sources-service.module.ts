import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';

@Module({
    providers: [SourcesService],
    exports: [SourcesService]
})
export class SourcesServiceModule { }
