import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  // imports: [UsersModule],
  // controllers: [AppController],
  // providers: [AppService],

  controllers: [UsersController],
})
export class AppModule {}
