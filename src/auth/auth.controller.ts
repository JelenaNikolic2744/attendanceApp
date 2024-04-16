import { Body, Controller, Post } from '@nestjs/common';
import { UserQueryParamsDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/users.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  /**
   * @description Check login
   * @return Promise<any>
   * @memberof AuthController
   */
  @Post()
  async loginUser(
    @Body() userQueryParamsDto: UserQueryParamsDto,
  ): Promise<any> {
    const userData = await this.userService.checkAuth(userQueryParamsDto.email);
    const userToken = await this.authService.login(
      userData,
      userQueryParamsDto,
    );

    return { jwt: userToken };
  }
}
