/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { verify, JwtPayload } from 'jsonwebtoken';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class VerifyStudentTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const decodedToken: any = verify(token, process.env.SECRET_KEY as string);

      if (decodedToken.role !== 'student') {
        throw new UnauthorizedException('No access');
      }

      return next.handle().pipe(
        tap(() => {}),
        catchError((err) => {
          return throwError(
            () =>
              new UnauthorizedException(err.message || 'Unauthorized access'),
          );
        }),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid token or unauthorized access');
    }
  }
}
