import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import Auth from './auth/auth';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [Auth],
})
export class AppModule {}
