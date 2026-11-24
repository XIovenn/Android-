// import dataRdb from '@ohos.data.rdb' //原模块名
//import relationalStore from '@ohos.data.relationalStore';
import { relationalStore } from '@kit.ArkData';
import { AppStorageV2, UIContext } from '@kit.ArkUI';

export class Rdb {
  rdbStore: relationalStore.RdbStore | null = null
  private sqlCreateTable: string = ''
  private STORE_CONFIG: relationalStore.StoreConfig = { name: 'my_Tel.db',securityLevel:1 }

  constructor(sqlCreateTable: string) {
    this.sqlCreateTable = sqlCreateTable
  }

  // 获取rdbStore
  async getRdbStore() {
    if (this.rdbStore != null) {
      return this.rdbStore.executeSql(this.sqlCreateTable);
    }
    // 获取应用上下文
    const context = AppStorageV2.connect(UIContext, 'uiContext', () => new UIContext())?.getHostContext();

    // 调用时传入获取到的 context
    let getPromiseRdb = relationalStore.getRdbStore(context, this.STORE_CONFIG);

    await getPromiseRdb.then(async (rdbStore) => {
      this.rdbStore = rdbStore;
      // 创建表
      rdbStore.executeSql(this.sqlCreateTable);
    }).catch((err:string) => {
      console.log("getRdbStore err." + JSON.stringify(err));
    });
  }
}