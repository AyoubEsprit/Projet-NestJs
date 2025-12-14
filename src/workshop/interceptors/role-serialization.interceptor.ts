import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../entities/workshop-user.entity';

@Injectable()
export class RoleSerializationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers['x-user-role'] || UserRole.CLIENT;

    return next.handle().pipe(
      map((data) => {
        if (!data) return data;

        if (Array.isArray(data)) {
          return data.map((item) => this.filterByRole(item, userRole));
        }

        return this.filterByRole(data, userRole);
      }),
    );
  }

  private filterByRole(user: any, role: string): any {
    if (!user || typeof user !== 'object') return user;

    if (role === UserRole.ADMIN) {
      return {
        id: user.id || user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }

    return {
      id: user.id || user._id,
      email: user.email,
    };
  }
}

