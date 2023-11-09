import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import AuthService from '../auth/auth';

@Injectable()
export class BlackListTokenGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization.split(' ')[1];

      console.log('BlackListTokenGuard from request', { token });

      const storage = await AuthService.getTokenBlackListFromStorage();

      const { tokenBlackList } = storage;

      console.log('BlackListTokenGuard from storage', { tokenBlackList });
      console.log(tokenBlackList.includes(token));

      if (tokenBlackList.includes(token)) {
        return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ error: e.message });
    }
  }
}
