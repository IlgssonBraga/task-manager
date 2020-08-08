import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserService } from './modules/user/services/create-user.service';
import { UserController } from './modules/user/controllers/users.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, CreateUserService],
})
export class AppModule {}
