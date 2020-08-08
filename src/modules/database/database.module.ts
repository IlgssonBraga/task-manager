import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../../config/configService';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
