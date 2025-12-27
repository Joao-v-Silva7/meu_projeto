import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [AuthModule, UserModule, DatabaseModule, ConfigModule, TaskModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
