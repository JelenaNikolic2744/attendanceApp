import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Cron } from '@nestjs/schedule';
import {
  DBResponse,
} from './interfaces';
import { UserQueryParamsDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * @description Everyday at 12pm deletes arrival date
   * @memberof UserService
   */
  @Cron('0 12 * * *', {
    timeZone: 'Europe/Belgrade',
  })
  handleCron() {
    this.resetAllDateArrival();
  }

  /**
   * @description Returns list of all users
   * @return Promise<User[]>
   * @memberof UserService
   */
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');
    return users;
  }

  /**
   * @description Returns found user
   * @return Promise<User>
   * @memberof UserService
   */
  async checkAuth(email: any): Promise<User> {
    const user = await this.userModel.findOne({
      email: email,
    });
    return user;
  }

  /**
   * @description Saves a user in db and returns saved user
   * @return Promise<User>
   * @memberof UserService
   */
  async addUser(userQueryParamsDto: UserQueryParamsDto): Promise<User> {
    const createUser = new this.userModel(userQueryParamsDto);
    return createUser.save();
  }

  /**
   * @description Saves arrival date and returns information about transaction
   * @return Promise<DBResponse>
   * @memberof UserService
   */
  async addDateArrival(
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    const { email, attendance } = userQueryParamsDto;
    try {
      if (email && attendance) {
        return await this.userModel.updateOne(
          { email: email },
          {
            $set: {
              attendance: attendance,
            },
          },
        );
      }
    } catch (err) {
      throw new Error(`Failed to add your date Arrival`);
    }
  }

  /**
   * @description Removes arrival date and returns information about transaction
   * @return Promise<DBResponse>
   * @memberof UserService
   */
  async resetAllDateArrival(): Promise<DBResponse> {
    const resetArrival = await this.userModel.updateMany({
      $set: {
        attendance: '',
      },
    });
    return resetArrival;
  }

  /**
   * @description Removes users arrival date and returns information about transaction
   * @return Promise<DBResponse>
   * @memberof UserService
   */
  async resetDateArrival(
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    const email = userQueryParamsDto.email;
    const resetArrival = await this.userModel.updateOne(
      { email: email },
      {
        $set: {
          attendance: '',
        },
      },
    );
    return resetArrival;
  }

  /**
   * @description Gets password, hashes it and return is
   * @return Promise<string>
   * @memberof UserService
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  /**
   * @description Updates password in db
   * @return Promise<DBResponse>
   * @memberof UserService
   */
  async updatePassword(
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    const { email, password } = userQueryParamsDto;
    const hashedPassword = await this.hashPassword(password);

    const passUpdate = await this.userModel.updateOne(
      { email: email },
      {
        $set: {
          password: hashedPassword,
        },
      },
    );
    return passUpdate;
  }

  /**
   * @description Saves a list of employees that user follows
   * @return Promise<DBResponse>
   * @memberof UserService
   */
  async addMyFollowers(
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    const { email, follower } = userQueryParamsDto;
    return await this.userModel.updateOne(
      {
        email: email,
      },
      {
        $push: {
          following: follower,
        },
      },
    );
  }

  /**
   * @description Removes one element from a following property
   * @return Promise<DBResponse>
   * @memberof UserService
   */
  async removeMyFollower(
    userQueryParamsDto: UserQueryParamsDto,
  ): Promise<DBResponse> {
    const { email, follower } = userQueryParamsDto;
    return await this.userModel.updateOne(
      {
        email: email,
      },
      {
        $pull: {
          following: {
            email: follower.email,
          },
        },
      },
    );
  }
}
