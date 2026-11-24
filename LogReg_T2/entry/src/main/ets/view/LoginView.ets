import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import UserViewModel from '../viewmodel/UserViewModel';
import { UserModel,UserInfo} from '../model/UserModel';
import Pref from '@ohos.data.preferences';
const DB_NAME = 'myDbT'; //存储名
let context = getContext(this);
@Component
export struct LoginView {
  @Consume email:string
  @State password:string=''
  @State useremail: string = 'abcd@qq.com'
  userinf:UserInfo=new  UserInfo(0,'张三','男','test@testmail.com')
  @State userList: UserModel[] = []
  private scroller: Scroller = new Scroller();
  // 登录用户，采用的同步await执行方式
  login(email: string, password: string) {
    // 1. 加上类型 UserModel[]
    UserViewModel.queryUserByEmail(email).then((ret: UserModel[]) => {
      this.userList = ret;

      // 2. 把 flag 的定义挪到这里来
      let flag = true;

      if (this.userList.length === 0) {
        promptAction.showToast({ message: "用户不存在！" })
      } else {
        promptAction.showToast({ message: "this.userList.length=" + this.userList.length })

        for (let i = 0; i < this.userList.length; i++) {
          if (password === this.userList[i].password) {
            flag = false
            this.userinf.userId = this.userList[i].userId
            this.userinf.userName = this.userList[i].name
            this.userinf.userGender = this.userList[i].gender
            this.userinf.userEmail = this.userList[i].email
            this.saveEmail(this.email)
            promptAction.showToast({ message: this.userList[i].email + "登录成功" })
          }
        }

        router.pushUrl({
          url: 'pages/Index',
          params: {
            userId: this.userinf.userId,
            userName: this.userinf.userName,
            userGender: this.userinf.userGender,
            userEmail: this.userinf.userEmail
          }
        })

      }
      // 现在这里就能访问到 flag 了
      if (flag) {
        promptAction.showToast({ message: "登录失败" })
      }
    })
  }

  async saveEmail(Email: string) {
    let pref = await Pref.getPreferences(context,DB_NAME);
    try {
      pref.put('keyEmail', Email);
      pref.flush();
      promptAction.showToast({message:"保存成功："+Email})
    }
    catch (err)  {
      console.error('保存失败, err: ' +err);
    }
  }
  build() {
    Column() {
      Image($r('app.media.banner' )).width('100%').height('15%')
      Blank()
      Column() {
        Text($r('app.string.title_login_label')).fontSize($r('app.float.font26'))
          .fontColor($r('app.color.text_color')).fontWeight(FontWeight.Medium)
        Scroll(this.scroller) {
          Column({ space: 8 }) {
            TextInput({ placeholder: $r('app.string.email_placeholder_label'), text: this.email })
              .height($r('app.float.float50'))
              .width('100%')
              .type(InputType.Email)
              .caretColor($r('app.color.text_color'))
              .placeholderColor($r('app.color.text_placeholder_color' ))
              .onChange((value)=>{
                this.email=value
              })
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
              .height($r('app.float.float50'))
              .width('100%')
              .showPasswordIcon(true)
              .margin({ top: $r('app.float.float12') })
              .type(InputType.Password)
              .caretColor($r('app.color.text_color'))
              .placeholderColor($r('app.color.text_placeholder_color'))
              .onChange((value)=>{
                this.password = value
              })
          }
        }
        .width('100%')
        .height(10)
        .layoutWeight(1) // 占据剩余空间，触发滚动条件
        //.scrollBar(BarState.Auto)
        .scrollBar(BarState.On) // 滚动条常驻显示
        //.edgeEffect(EdgeEffect.None)
        //.friction(0.6)
        .edgeEffect(EdgeEffect.Spring)
        Button() {
          Text($r('app.string.login_label')).fontColor(Color.White).fontSize($r('app.float.font18'))
        }.width('100%').height($r('app.float.float58'))
        .backgroundColor($r('app.color.btn_bg_color'))
        .margin({top: $r('app.float.float28')})
        .onClick(()=>{
          if (this.email===''){
            promptAction.showToast({message:$r('app.string.email_err_label')})
            return
          }
          if (this.password===''){
            promptAction.showToast({message:$r('app.string.password_err_label')})
            return
          }
          this.login(this.email,this.password)
        })
        Blank()
        Row(){
          Text($r('app.string.subtitle_login_label')).fontColor($r('app.color.text_color'))
            .onClick(()=>{
              router.pushUrl({
                url:'pages/RegisterPage'
              }
              )
            }
            )
          Blank()
          Text($r('app.string.forget_pwd_label')).fontColor($r('app.color.text_color'))
        }.width('100%').padding({ left: 16, right: 16 })
        Blank()
      }
      .backgroundColor(Color.White)
      .width('95%')
      .height('45%')
      .padding({ left: $r('app.float.float10'), right: $r('app.float.float10')})
      .borderRadius($r('app.float.font18'))
      .shadow({
        radius: $r('app.float.float10'),
        color: $r('app.color.shadow_color'),
        offsetX: $r('app.float.float4'),
        offsetY: $r('app.float.float8')
      })
      Blank()
      Row(){
        Blank()
        Divider().width($r('app.float.float100')).color($r('app.color.shadow_color'))
        Text($r('app.string.other_label'))
          .margin({left:$r('app.float.float18') ,right: $r('app.float.float18')})
          .fontColor($r('app.color.text_color'))
          .fontSize($r('app.float.font16'))
        Divider().width($r('app.float.float100')).color($r('app.color.shadow_color'))
        Blank()
      }.width('100%')
      Row(){
        Blank()
        Image($r('app.media.share_icon_sinaweibo')).width($r('app.float.float60'))
          .height($r('app.float.float60'))
        Blank()
        Image($r('app.media.share_icon_wechat')).width($r('app.float.float60'))
          .height($r('app.float.float60'))
        Blank()
      }.width('108%').margin({top:$r('app.float.float10')})
      Blank()
    }.width('100%').height('100%' ) .backgroundColor($r('app.color.bg_color'))
  }
}