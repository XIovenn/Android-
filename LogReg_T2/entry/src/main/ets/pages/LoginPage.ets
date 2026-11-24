import { LoginView } from '../view/LoginView'
import Pref from '@ohos.data.preferences';
import promptAction from '@ohos.promptAction';
const DB_NAME = 'myDbT'; //存储名
let context = getContext(this);
@Entry
@Component
struct LoginPage {
  @Provide email: string = 'examp@qq.com'

  // 获得Preferences中的email
  async getEmail() {
    let lemail: string = '';
    let pref = await Pref.getPreferences(context, DB_NAME);
    try {
      lemail = (await pref.get('keyEmail', '')).toString();
    } catch (err) {
      console.error('获取失败, err: ' + err);
      promptAction.showToast({ message: "获取失败, err: " + err })
    }
    return lemail;
  }

  onPageShow() {
    this.getEmail().then((value) => {
      this.email = value
      if (this.email) {
        promptAction.showToast({ message: "获取成功：" + value })
      }
    })
  }

  build() {
    Column() {
      LoginView()
    }
  }
}