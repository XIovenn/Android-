export class UserModel {
  userId: number
  name: string
  gender: string
  email: string
  password: string
  constructor(id: number, name: string,gender: string, email: string,
    password: string) {
    this.userId = id
    this.name = name
    this.gender=gender
    this.email = email
    this.password = password
  }
  toString() {
    return this.userId + ' ' + this.name + ' ' + this.gender + ' ' + this.email + '' + this.password + '\n';
  }
}
export class UserInfo {
  userId: number
  userName: string
  userGender: string
  userEmail: string

  constructor(id: number, name: string, gender: string, email: string) {
    this.userId = id
    this.userName = name
    this.userGender = gender
    this.userEmail = email
  }
}