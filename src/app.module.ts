import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
