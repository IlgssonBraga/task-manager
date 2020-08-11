import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
