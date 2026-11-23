export class UserModel {
  userId: number
  name: string
  email: string
  password: string

  constructor(id: number, name: string, email: string, password: string) {
    this.userId = id
    this.name = name
    this.email = email
    this.password = password
  }
}
export class UserInfo {
  userId: number;
  userName: string;
  userGender: string; // 👈 加上这行，告诉它你认识这个东西
  userEmail: string;

  constructor(id: number, name: string, email: string, gender?: string) {
    this.userId = id;
    this.userName = name;
    this.userEmail = email;
    this.userGender = gender || ''; // 给个默认值，防止之前传3个参数的地方报错
  }
}