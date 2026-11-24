export class User {
  userId?:number
  name: string;
  gender: string;
  email: string;
  password: string;
  constructor( name:string, sex:string, email:string, pwd:string,id?:number ) {
    this.userId = id
    this.name = name;
    this.gender = sex;
    this.email = email;
    this.password = pwd;
  }

  toString() {
    return  this.userId + ' ' + this.name + ' ' + this.gender + ' ' + this.email + ' ' + this.password + '\n';
  }
}
