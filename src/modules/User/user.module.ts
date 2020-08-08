import { Module } from '@nestjs/common';
import { UsersController } from './controllers/UsersController';
import { CreateUserService } from './services/CreateUserService';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [CreateUserService],
})
export class UserModule {}
