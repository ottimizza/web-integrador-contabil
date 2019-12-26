import { Organization } from './Organization';

export class User {

  static Type = class {
    static ADMINISTRATOR = 0;
    static ACCOUNTANT = 1;
    static CUSTOMER = 2;
  };

  id: number;
  username: string;
  password: string;

  activated: boolean;
  type: number;

  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  organization: Organization;

  constructor() {
  }

  static fromLocalStorage(): User {
    const storedUser = JSON.parse(localStorage.getItem('user-info') || '{}');
    const user = new User();
    if (storedUser !== null && typeof storedUser !== 'undefined') {
      if (storedUser.username !== null && typeof storedUser.username !== 'undefined') {
        user.id = storedUser.id;
        user.id = storedUser.id;
        user.username = storedUser.username;
        user.password = storedUser.password;
        user.activated = storedUser.activated;
        user.type = storedUser.type;
        user.avatar = storedUser.avatar;
        user.email = storedUser.email;
        user.firstName = storedUser.firstName;
        user.lastName = storedUser.lastName;
        user.phone = storedUser.phone;
        return user;
      }
    }

    return user;
  }

}
