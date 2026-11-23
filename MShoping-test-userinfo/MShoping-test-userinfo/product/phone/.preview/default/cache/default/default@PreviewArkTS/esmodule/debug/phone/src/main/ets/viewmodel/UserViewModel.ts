import { UserModel, UserInfo } from "@bundle:com.example.multishopping/phone/ets/model/UserModel";
class UserViewModel {
    userdata: UserModel = new UserModel(0, '张三', 'test@testmail.com', '123456');
    userinf: UserInfo = new UserInfo(0, '张三', 'test@testmail.com');
    userLogin(email: string, password: string): UserInfo | null {
        if (email === this.userdata.email && password === this.userdata.password) {
            this.userinf.userId = this.userdata.userId;
            this.userinf.userName = this.userdata.name;
            this.userinf.userEmail = this.userdata.email;
            return this.userinf;
        }
        else {
            return null;
        }
    }
    registerUser(user: UserModel): Boolean {
        this.userdata.userId = user.userId;
        this.userdata.name = user.name;
        this.userdata.email = user.email;
        this.userdata.password = user.password;
        return true;
    }
}
let userViewModel = new UserViewModel();
export default userViewModel as UserViewModel;
