/**
 * @description Auth data used for login and updating password
 * @export
 * @interface AuthData
 */
export interface AuthData {
  email: string;
  password: string;
}

/**
 * @description Data needed for updating arrival date
 * @export
 * @interface ArrivalData
 */
export interface ArrivalData {
  email: string;
  attendance: Date;
}

/**
 * @description Data needed for removal in list of employees that user follows
 * @export
 * @interface RemoveFollowerData
 */
export interface RemoveFollowerData {
  email: string;
  follower: Followers;
}

/**
 * @description List of employees data for following property list
 * @export
 * @interface Followers
 */
export interface Followers {
  email: string;
  name: string;
  lastname: string;
}

/**
 * @description Data needed for finding user and updating his following property list
 * @export
 * @interface FollowersData
 */
export interface FollowersData {
  email: string;
  following: Followers[];
}

/**
 * @description Information after transaction with db
 * @export
 * @interface DBResponse
 */
export interface DBResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: any;
  upsertedCount: number;
  matchedCount: number;
}

/**
 * @description Employee data for following property list
 * @export
 * @interface Employee
 */
export interface Employee {
  name: string;
  lastname: string;
  email: string;
}
