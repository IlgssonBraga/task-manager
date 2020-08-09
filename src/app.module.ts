import { Module } from '@nestjs/common';
// import { RouterModule } from 'nest-router';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
// import { DatabaseModule } from './modules/database/database.module';
// import { User } from './modules/database/entities/User';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
