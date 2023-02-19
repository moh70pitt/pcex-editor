import { Module } from '@nestjs/common';
import { ActivitiesServiceModule } from 'src/activities-service/activities-service.module';
import { CompilerServiceModule } from 'src/compiler-service/compiler-service.module';
import { CompilerController } from './compiler.controller';

@Module({
  controllers: [CompilerController],
  imports: [CompilerServiceModule, ActivitiesServiceModule]
})
export class CompilerModule { }
