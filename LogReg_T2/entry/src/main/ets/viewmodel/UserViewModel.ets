import { UserModel} from '../model/UserModel';
import UserAPI from '../db/UserAPI';
class UserViewModel {
  userdata:UserModel=new  UserModel(0,'张三','男','test@testmail.com ','123456')
  //private userTableApi = new UserAPI()
  private userTableApi = UserAPI
  //private userList: UserModel[] = []
  async queryUserByEmail(email:string):Promise<UserModel[]> {
    const users: UserModel[] = await
    this.userTableApi.queryUserByEmail(email);
    return users
  }
  async registerUser(user: UserModel): Promise<boolean> {
    await this.userTableApi.insertUser(user)
    return true
  }
}
let  userViewModel=new  UserViewModel()

export default userViewModel as UserViewModel