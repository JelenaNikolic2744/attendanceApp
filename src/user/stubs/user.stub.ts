import { DBResponse } from '../interfaces';
import { User } from '../users.schema';

export const userStub = (): User => {
  return {
    email: 'ivan.rakic@gmail.com',
    password: 'irakic',
    name: 'ivan',
    lastname: 'rakic',
    attendance: null,
    following: null,
  };
};

export const dbResponseStub = (): DBResponse => {
  return {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: 1,
    upsertedCount: 1,
    matchedCount: 1,
  };
};
