@Entry
@Component
struct Index {
  @State currentIndex: number = 0

  // 封装公共 UI 结构
  @Builder barBuilder(index: number, title: string, icon: Resource, iconSelected: Resource) {
    Column() {
      Image(this.currentIndex === index ? iconSelected : icon)
        .width(25)
        .height(25)
      Text(title)
        .fontColor(this.currentIndex === index ? '#0491d1' : '#8a8a8a')
        .fontWeight(FontWeight.Medium)
    }
  }
  @Builder tabItem(index: number, img: ResourceStr, title: string) {
    Column() {
      Image(img)
        .width(24)
        .height(24)
        .fillColor(this.currentIndex === index ? '#007DFF' : '#000')
      Text(title)
        .fontColor(this.currentIndex === index ? '#007DFF' : '#000')
    }
  }

  build() {
    // 列容器
    Column({
      // 主轴方向的间隔
      // space: 30
    }) {
      // 导航
      Tabs() {
        TabContent() {
          Row(){
            Image($r('app.media.first'))
              .width(24)
              .height(24)
            Text('首页内容')
          }
        }
        // 页签
        .tabBar(this.tabItem(0, $r('app.media.first'), '首页'))

        TabContent() {
          Row(){
            Image($r('app.media.message'))
              .width(24)
              .height(24)
            Text('消息内容')
          }
        }
        // 页签
        .tabBar(this.tabItem(1, $r('app.media.message'), '消息'))

        TabContent() {
          Row(){
            Image($r('app.media.my'))
              .width(24)
              .height(24)
            Text('我的内容')
          }
        }
        // 页签
        .tabBar(this.tabItem(1, $r('app.media.my'), '我的'))
      }
      // 导航栏位置
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