import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Admin } from './admins/entities/admin.entity';
import { TeachersModule } from './teachers/teachers.module';
import { Teacher } from './teachers/entities/teacher.entity';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { TeacherAuthModule } from './teacher-auth/teacher-auth.module';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';
import { StudentAuthModule } from './student-auth/student-auth.module';
import { CoursesModule } from './courses/courses.module';
import { HometasksModule } from './hometasks/hometasks.module';
import { LessonsModule } from './lessons/lessons.module';
import { Course } from './courses/entities/course.entity';
import { Lesson } from './lessons/entities/lesson.entity';
import { Hometask } from './hometasks/entities/hometask.entity';
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
      entities: [Admin, Teacher, Student, Course, Lesson, Hometask],
      synchronize: true,
      logging: true,
    }),
    AdminsModule,
    TeachersModule,
    AdminAuthModule,
    TeacherAuthModule,
    StudentsModule,
    StudentAuthModule,
    CoursesModule,
    LessonsModule,
    HometasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
