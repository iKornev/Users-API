import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationPipe } from '../pipes/validation.pipe';
import { userAuthSchema } from '../validation/auth-validation-schema';
import UserAuthDto from './dto/userAuth.dto';
import UserResponseDto from './dto/userResponse.dto';
import { JwtAuthGuard } from '../guards/jwt-guard';
import { BlackListTokenGuard } from '../guards/black-list-token-guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('/auth')
  auth(
    @Request() request,
    @Body(new JoiValidationPipe(userAuthSchema)) userData: UserAuthDto,
  ): Promise<UserResponseDto> {
    return this.usersService.userSignUp(userData);
  }

  @Post('/login')
  login(
    @Request() request,
    @Body(new JoiValidationPipe(userAuthSchema)) userData: UserAuthDto,
  ): Promise<UserResponseDto> {
    return this.usersService.userSignIn(userData);
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard, BlackListTokenGuard)
  logout(@Headers() headers: Record<string, string>): Promise<string> {
    return this.usersService.userSignOut(headers);
  }

  @UseGuards(JwtAuthGuard, BlackListTokenGuard)
  @Get('/me')
  findAll(): string {
    return 'You are authorized user';
  }
}
