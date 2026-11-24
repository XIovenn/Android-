import { promptAction, router } from '@kit.ArkUI'
import { User } from '../db/User';
import UserAPI from '../db/UserAPI'

@Entry
@Component
struct Index {
  @State username: string = '张三'
  @State userList: User[] = []
  @State result: string = ''
  private userTableApi = UserAPI

  build() {
    Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
      Text('用户信息')
        .margin(10).width('90%').fontSize(35).align(Alignment.Center)
      TextInput({ placeholder: '请输入用户名', text: this.username })
        .margin(10).width('95%').fontSize(28)
        .onChange((v) => {
          this.username = v
        })
      Row() {
        Button('按姓名查询', { type: ButtonType.Capsule, stateEffect: true })
          .width('30%')
          .padding(0)
          .margin(1)
          .fontSize(20)
          .backgroundColor('#1890FF')
          .onClick(() => {
            // 用户数据校验
            if (!this.checkUserData()) {
              return;
            }
            // 查询用户
            this.queryUser();
          });
        Button('查询全部', { type: ButtonType.Capsule, stateEffect: true })
          .width('30%')
          .padding(0)
          .margin(1)
          .fontSize(20)
          .backgroundColor('#1890FF')
          .onClick(() => {
            this.queryAllUser();
          });
        Button('删除全部', { type: ButtonType.Capsule, stateEffect: true })
          .width('30%')
          .padding(0)
          .margin(1)
          .fontSize(20)
          .backgroundColor('#1890FF')
          .onClick(() => {
            this.deleteAllUser();
          });
      }

      // 用于显示结果文本
      Text(this.result)
        .fontSize(25)
        .margin(10)
        .align(Alignment.TopStart)
        .layoutWeight(1)
        .width('95%')
        .backgroundColor(0xEEEEEE)

      // 跳转到添加界面
      Text("添加用户")
        .fontColor('#0000FF')
        .fontSize(25)
        .margin(10)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/adduser'
          });
        });
    }
    .width('100%')
    .height('100%')
  }

  // 户名数据校验，这里仅仅校验了用户名
  checkUserData() {
    if (this.username == '') {
      promptAction.showToast({
        message: '请输入用户名！',
        duration: 3000,
        bottom: '40%'
      });
      return false;
    }
    return true;
  }

  // 查询用户，采用的同步await执行方式
  queryUser() {
    this.userTableApi.queryUserByName(this.username).then(( ret ) => {
      if( ret!=null )
      {
        this.userList = ret.convertToArray();
      }
      if (this.userList.length === 0) {
        promptAction.showToast({
          message: '用户不存在！',
          duration: 3000,
          bottom: '40%'
        });
      }
      this.display();
    })
  }

  // 查询所有用户,回调方式
  queryAllUser() {
    this.userTableApi.queryUserAll().then((ret) => {
      if( ret!=null )
      {
        this.userList = ret.convertToArray();
        console.info(this.userList.toString());
      }
      if (this.userList.length === 0) {
        this.result='';
        promptAction.showToast({
          message: '暂无用户！',
          duration: 3000,
          bottom: '40%'
        });
      }
      this.display();
    })
  }

  // 查询所有用户,回调方式
  deleteAllUser() {
    this.userTableApi.deleteAll().then((ret:number) => {
      if (ret > 0) {
        this.result = ''
      }
    })
  }

  // 用户列表转成字符串显示
  display() {
    let s = ''
    for (let i = 0;i < this.userList.length; i++) {
      s += this.userList[i].toString()
    }
    this.result = s
  }
}