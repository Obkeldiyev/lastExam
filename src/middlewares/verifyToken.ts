import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VerifyTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    return next.handle().pipe(
      tap(() => {}),
      catchError((err) => {
        return throwError(
          () => new UnauthorizedException(err.message || 'Unauthorized access'),
        );
      }),
    );
  }
}
