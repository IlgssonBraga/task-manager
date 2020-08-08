import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    RouterModule.forRoutes([
      {
        path: '/a',
        module: UserModule,
      },
    ]),
    UserModule,
  ],
})
export class AppModule {}
