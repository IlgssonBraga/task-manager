import { Module } from '@nestjs/common';
// import { CreateUserService } from './services/create-user.service';
import { UserController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user.service';
// import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UserModule {}
