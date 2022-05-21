import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

/** Controller
 * Same meaning as MVC's Controller.
 * Interface whice takes request and return response.
 */

@Controller()
// @Controller('/app') -> '/app', '/app/hello', ...
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Get('/')
  getRoot(): string {
    return 'This is home';
  }

  @Get('/hello')
  getHello(@Req() req: Request): string {
    /** Requset Object
     * You can handle request object by using @Req() decorator.
     * It is HTTP request.
     * But you can handle request more easily(and mostly) by using @Query(), @Param(key?: string), @Body.
     */
    return this.appService.getHello();
  }

  // @Get('/he*lo') -> '/helo', '/hello', '/heilo', ...
}
