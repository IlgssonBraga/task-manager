import { Module } from '@nestjs/common';

@Module({
  imports: [require('../../config/database')],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
