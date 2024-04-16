import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserQueryParamsDto } from './dto/user.dto';
import { DBResponse } from './interfaces';
import { UserService } from './user.service';
import { User } from './users.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @description Returns a response containing list of all users
   * @return (Promise<User[]>)
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  /**
   * @description Inserts one new user in db
   * @param  {UserQueryParamsDto} userQueryParamsDto
   * @return (Promise<User>)
   * @memberof UserController
   */
  @Post('add-user')
  async addUser(
    @Body()
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<User> {
    return await this.userService.addUser(userQueryParamsDto);
  }

  /**
   * @description Updates db document property attendance
   * @param  {UserQueryParamsDto} userQueryParamsDto
   * @return (Promise<DBResponse>)
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('arrival')
  async addDateArrival(
    @Body() userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    return await this.userService.addDateArrival(userQueryParamsDto);
  }

  /**
   * @description Removes db document property attendance
   * @param  {UserQueryParamsDto} userQueryParamsDto
   * @return (Promise<DBResponse>)
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('reset-arrival')
  async resetDateArrival(
    @Body() userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    return await this.userService.resetDateArrival(userQueryParamsDto);
  }

  /**
   * @description Updates db document property password
   * @param  {UserQueryParamsDto} userQueryParamsDto
   * @return (Promise<DBResponse>)
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('update-password')
  async updatePassword(
    @Body() userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    return await this.userService.updatePassword(userQueryParamsDto);
  }

  /**
   * @description Inserts a list of elements to db document property following
   * @param  {UserQueryParamsDto} userQueryParamsDto
   * @return (Promise<DBResponse>)
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('my-followers')
  async addMyFollowers(
    @Body() userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    return await this.userService.addMyFollowers(userQueryParamsDto);
  }

  /**
   * @description Removes elements from db document property following
   * @param  {UserQueryParamsDto} userQueryParamsDto
   * @return (Promise<DBResponse>)
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('remove-follower')
  async removeMyFollower(
    @Body() userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    return await this.userService.removeMyFollower(userQueryParamsDto);
  }
}
