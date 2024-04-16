import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  MinLength,
} from 'class-validator';
import { Employee } from '../interfaces';
/**
 * @description Data transfer object used for parameters validation
 * @export
 * @class UserQueryParamsDto
 */
export class UserQueryParamsDto {
  /**
   * @description Parameter user email
   * @type string
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  /**
   * @description Parameter parameter password
   * @type string
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;

  /**
   * @description Parameter name
   * @type string
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  /**
   * @description Parameter lastname
   * @type string
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastname: string;

  /**
   * @description Parameter attendance
   * @type Date
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  attendance: Date;

  /**
   * @description Parameter following
   * @type Employee
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsOptional()
  following: Employee;

  /**
   * @description Parameter following
   * @type Employee
   * @memberof UserQueryParamsDto
   */
  @IsNotEmpty()
  @IsOptional()
  follower: Employee;
}
