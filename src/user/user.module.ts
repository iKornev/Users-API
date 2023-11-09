import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import Auth from '../auth/auth';
import { JwtStrategy } from '../strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), Auth],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
