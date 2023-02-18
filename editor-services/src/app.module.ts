import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SourcesModule } from './sources/sources.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    SourcesModule,
    ActivitiesModule,
  ],
  controllers: [
    AppController
  ],
})
export class AppModule { }
