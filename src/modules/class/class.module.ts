import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import ClassRepository from './class.repository';

@Module({
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
})
export class ClassModule {}
