/* eslint-disable prettier/prettier */
export type UsersType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  roles?: ['ADMIN' | 'USER'];
};
