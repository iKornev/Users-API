import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import UserAuthDto from './dto/userAuth.dto';
import UserResponseDto from './dto/userResponse.dto';
import AuthService from '../auth/auth';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async userSignUp(userData: UserAuthDto): Promise<UserResponseDto> {
    const { login, password } = userData;
    const candidate = await this.userRepository.findOne({ login });

    if (candidate) {
      throw new BadRequestException({ error: 'User Exist' });
    }

    const data = { ...userData };
    data.password = await AuthService.generatePasswordHash(password);

    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);

    const token = AuthService.generateToken(newUser.login, newUser.id);

    return new UserResponseDto(`Bearer ${token}`);
  }

  async userSignIn(userData: UserAuthDto) {
    const { login, password } = userData;
    const user = await this.userRepository.findOne({ login });
    if (!user) {
      throw new BadRequestException({ error: 'User not found' });
    }

    const passwordIsMatch = AuthService.validatePassword(
      user.password,
      password,
    );
    if (!passwordIsMatch) {
      throw new BadRequestException({ error: 'Incorrect password' });
    }

    const token = AuthService.generateToken(user.login, user.id);

    return new UserResponseDto(`Bearer ${token}`);
  }

  async userSignOut(headers: Record<string, string>) {
    const authorizationHeader = headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    const storage = await AuthService.getTokenBlackListFromStorage();
    const { tokenBlackList } = storage;

    tokenBlackList.push(token);
    AuthService.setTokenToBlackList(storage);

    return 'Sign Outed!';
  }
}
