import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import { UserModel } from '../model/UserModel';
import UserViewModel from '../viewmodel/UserViewModel';
@Component
export struct RegisterView {
  @State name:string=''
  @State email:string=''
  @State password:string=''
  register(user: UserModel) {
    let data=UserViewModel.registerUser(user)
    if (data)
    {
      promptAction.showToast({message:"注册成功"+user.email})
      router.pushUrl({
        url:'pages/LoginPage'
      }
      )
    }else{
      promptAction.showToast({message: "注册失败"})
    }
  }
  build() {
    Column() {
      Image($r('app.media.banner' )).width('100%').height('15%')
      Blank()
      Column() {
        Text($r('app.string.title_register_label')).fontSize($r('app.float.font26'))

          .fontColor($r('app.color.text_color')).fontWeight(FontWeight.Medium)
        TextInput({placeholder: $r('app.string.name_register_label')})
          .height($r('app.float.float50'))
          .width('100%')
          .margin({bottom:$r('app.float.float10')})
          .type(InputType.Email)
          .caretColor($r('app.color.text_color'))
          .placeholderColor($r('app.color.text_placeholder_color' ))
          .onChange((value)=>{
            this.name=value
          })
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

          Text($r('app.string.register_label')).fontColor(Color.White).fontSize($r('app.float.font18'))
        }.width('100%').height($r('app.float.float58'))
        .backgroundColor($r('app.color.btn_bg_color'))
        .margin({top: $r('app.float.float28')})
        .onClick(()=>{
          if (this.name===''){

            promptAction.showToast({message:$r('app.string.name_err_label')})
            return
          }
          if (this.email===''){

            promptAction.showToast({message:$r('app.string.email_err_label')})
            return
          }
          if (this.password===''){

            promptAction.showToast({message:$r('app.string.password_err_label')})
            return
          }
          let user=new UserModel(0,this.name,this.email,this.password)
          this.register(user)
        })
        Blank()
        Row(){

          Text($r('app.string.subtitle_register_label')).fontColor($r('app.color.text_color'))
          .onClick(()=>{
            router.pushUrl({
              url:'pages/LoginPage'
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
      .height('50%')
      .padding({ left: $r('app.float.float10'), right: $r('app.float.float10')})
      .borderRadius($r('app.float.font18'))
      .shadow({
        radius: $r('app.float.float10'),
        color: $r('app.color.shadow_color'),
        offsetX: $r('app.float.float4'),
        offsetY: $r('app.float.float8')
      })
      Blank()
    }.width('100%').height('100%' )
    .backgroundColor($r('app.color.bg_color'))
  }
}