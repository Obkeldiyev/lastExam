import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Admin } from './admins/entities/admin.entity';
import { TeachersModule } from './teachers/teachers.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      entities: [Admin],
      synchronize: true,
      logging: true,
    }),
    AdminsModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
