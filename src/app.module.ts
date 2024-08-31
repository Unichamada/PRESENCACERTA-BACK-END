import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';

@Module({
  imports: [PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
