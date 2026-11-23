import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import url from '@ohos.url';
import UserViewModel from '../viewmodel/UserViewModel';
//import { PageConstants } from '../constants/PageConstants';
@Component
export struct LoginView {
  @State email:string=''
  @State password:string=''
  login(email: string, password: string){
    let data=UserViewModel.userLogin(email,password)
    if (data)
    {
      promptAction.showToast({message:"登录成功"+data.userEmail})
      router.pushUrl({
        //url:PageConstants.MAIN_PAGE_URL,
        url:'pages/Index',

        params:{userId:data.userId,userName:data.userName,userEmail:data.userEmail}
      }
      )
    }else{
      promptAction.showToast({message: "登录失败"})
    }
  }
  build() {
    Column() {
      Image($r('app.media.banner' )).width('100%').height('15%')
      Blank()
      Column() {
        Text($r('app.string.title_login_label')).fontSize($r('app.float.font26'))

          .fontColor($r('app.color.text_color')).fontWeight(FontWeight.Medium)
        TextInput({placeholder: $r('app.string.email_placeholder_label')})
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
            this.password=value
          })
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

          Text($r('app.string.subtitle_login_label')).fontColor($r('app.color.text_color')
          )
            .onClick(()=>{
              router.pushUrl({
                url:'pages/RegisterPage'
              }
              )
            }
            )
          Blank()

          Text($r('app.string.forget_pwd_label')).fontColor($r('app.color.text_color'))
        }.width('100%')
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

        Image($r('app.media.share_icon_sinaweibo')).width(45)
          .height(45)
        Blank()

        Image($r('app.media.share_icon_wechat')).width(45)
          .height(45)
        Blank()
      }.width('108%').margin({top:$r('app.float.float10')})
      Blank()
    }.width('100%').height('100%' )
    .backgroundColor($r('app.color.bg_color'))
  }
}