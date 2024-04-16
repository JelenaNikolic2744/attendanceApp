import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserQueryParamsDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/users.schema';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @description Compares passwords
   * @return Promise<any>
   * @memberof AuthService
   */
  async login(
    user: User,
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<any> {
    const { email, password } = userQueryParamsDto;
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this._createToken(user.email);
      return token;
    } else {
      throw new UnauthorizedException('Login Failed!');
    }
  }

  /**
   * @description Creates token
   * @return Promise<any>
   * @memberof AuthService
   */
  private _createToken(email: string): any {
    const accessToken = this.jwtService.sign({ email }, { expiresIn: '5m' });
    return accessToken;
  }
}
