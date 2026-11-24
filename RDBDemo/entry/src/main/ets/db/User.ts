export class User {
  userId?: number
  name: string;
  gender: string;
  email: string;
  password: string

  constructor(name: string, gender: string, email: string, password: string,
    userId?: number) {
    this.userId = userId
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }

  toString() {
    return this.userId + ' ' + this.name + ' ' + this.gender + ' ' + this.email +
      ' ' + this.password + '\n';
  }
}