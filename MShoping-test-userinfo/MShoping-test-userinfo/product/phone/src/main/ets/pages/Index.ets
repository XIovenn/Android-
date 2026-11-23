//import router from '@ohos.router';
import { router } from '@kit.ArkUI';
import { UserInfo} from '../model/UserModel';
class ButtonInfoModel {
  index: number = 0;
  img: Resource = $r('app.media.ic_home_normal');
  selectImg: Resource = $r('app.media.ic_home_focus');
  title: string = '';
}
@Entry
@Component
struct Index {
  @State message: string = 'Hello '
  @State currentIndex: number = 0
  @State params: UserInfo = {} as UserInfo;
  @State userInfo: UserInfo = {
    userId: -1,
    userName: 'Mtest',
    userGender: '', // 补上这个字段
    userEmail: 'Mtest@Mtest.com'
  };
  // 封装公共 UI 结构
  buttonInfo: ButtonInfoModel[] = [
    {
      index: 0,
      img: $r('app.media.ic_home_normal'),
      selectImg: $r('app.media.ic_home_focus'),
      title: '首页'
    },
    {
      index: 1,
      img: $r('app.media.ic_product_normal'),
      selectImg: $r('app.media.ic_product_focus'),
      title: '新品'
    },
    {
      index: 2,
      img: $r('app.media.ic_cart_normal'),
      selectImg: $r('app.media.ic_cart_focus'),
      title: '购物车'
    },
    {
      index: 3,
      img: $r('app.media.ic_personal_normal'),
      selectImg: $r('app.media.ic_personal_focus'),
      title: '我的'
    }
  ]

  @Builder
  BottomNavigation(button: ButtonInfoModel) {
    Column({ space: 10 }) {
      Image(this.currentIndex === button.index ? button.selectImg : button.img)
        .objectFit(ImageFit.Contain)
        .width(24)
        .height(24)
      Text(button.title)
        .fontColor(this.currentIndex === button.index ? '#007DFF' : '#000')
    }
  }

  onPageShow() {
    this.params = router.getParams() as UserInfo;
    if (this.params != undefined) {
      this.userInfo = {
        userId: this.params.userId,
        userName: this.params.userName,
        userGender: this.params.userGender || '', // 👈 补上这一行
        userEmail: this.params.userEmail
      };
    } else {
      this.userInfo = {
        userId: -1,
        userName: 'Mtest',
        userGender: '', // 👈 补上这一行
        userEmail: 'Mtest@Mtest.com'
      };
    }
  }

  build() {
    //列容器

    Column({
      //主轴方向的间隔

      // space: 30
    }) {
      //导航

      Tabs() {
        TabContent() {
          Row() {
            Image($r('app.media.ic_home_normal'))
              .width(24)
              .height(24)
            Text('首页内容')
          }
        }

        //页签

          .tabBar(this.BottomNavigation(this.buttonInfo[0]))
        TabContent() {
          Row() {
            Image($r('app.media.ic_product_normal'))
              .width(24)
              .height(24)
            Text('新品内容')
          }
        }

        //页签

          .tabBar(this.BottomNavigation(this.buttonInfo[1]))
        TabContent() {
          Row() {
            Image($r('app.media.ic_cart_normal'))
              .width(24)
              .height(24)
            Text('购物车内容')
          }
        }

        //页签

          .tabBar(this.BottomNavigation(this.buttonInfo[2]))
        TabContent() {
          Column({ space: 10 }) {
            Row({ space: 5 }) {
              Image($r('app.media.ic_personal_normal'))
                .width(24)
                .height(24)
              Text('姓名: ' + this.userInfo.userName)
            }

            // Row({ space: 5 }) {
            //   Image($r('app.media.gender'))
            //     .width(24)
            //     .height(24)
            //   Text('性别: ' + '')
            // }
            //
            // Row({ space: 5 }) {
            //   Image($r('app.media.Email'))
            //     .width(24)
            //     .height(24)
            //   Text('邮箱: ' + this.userInfo.userEmail)
            // }
          }
          .justifyContent(FlexAlign.Start)
          .alignItems(HorizontalAlign.Start)
        }

        //页签

          .tabBar(this.BottomNavigation(this.buttonInfo[3]))
      }

      //导航栏位置

        .vertical(false)  // 是否垂直排列（默认值）
        // .barPosition(BarPosition.Start)  // 起始端（默认值）
        .barPosition(BarPosition.End)  // 末端
        .onChange((index: number) => {
          this.currentIndex = index;
        })
    }
    .width('100%')
    .height('100%')

    //.backgroundColor('#999')
  }
}