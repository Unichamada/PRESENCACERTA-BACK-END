import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassModule } from './modules/class/class.module';

@Module({
  imports: [ClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
