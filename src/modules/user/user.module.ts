import { Module } from '@nestjs/common';
// import { CreateUserService } from './services/create-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user.service';
import { DatabaseModule } from '../database/database.module';
import { User } from '../database/entities/User';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
