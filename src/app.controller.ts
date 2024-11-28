import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './shared/decorators/is_public.decorator';

@IsPublic()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
