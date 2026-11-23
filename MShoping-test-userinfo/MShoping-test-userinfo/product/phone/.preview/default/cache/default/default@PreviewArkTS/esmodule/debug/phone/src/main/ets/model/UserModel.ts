export class UserModel {
    userId: number;
    name: string;
    email: string;
    password: string;
    constructor(id: number, name: string, email: string, password: string) {
        this.userId = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
export class UserInfo {
    userId: number;
    userName: string;
    userEmail: string;
    constructor(id: number, name: string, email: string) {
        this.userId = id;
        this.userName = name;
        this.userEmail = email;
    }
}
