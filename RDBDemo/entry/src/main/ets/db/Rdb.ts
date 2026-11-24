// import dataRdb from '@ohos.data.rdb' //原模块名
import { relationalStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit'; // ✅ 导入 common 命名空间

export class Rdb {
  rdbStore: relationalStore.RdbStore | null = null
  private sqlCreateTable: string = ''
  private STORE_CONFIG: relationalStore.StoreConfig = { name: 'my_Tel.db', securityLevel: 1 }

  constructor(sqlCreateTable: string) {
    this.sqlCreateTable = sqlCreateTable
  }

  // 获取rdbStore
  async getRdbStore() {
    if (this.rdbStore != null) {
      return this.rdbStore.executeSql(this.sqlCreateTable);
    }

    // ✅ 将 getContext(this) 替换为 globalThis.context
    let getPromiseRdb = relationalStore.getRdbStore(globalThis.context as common.Context, this.STORE_CONFIG);

    await getPromiseRdb.then(async (rdbStore) => {
      this.rdbStore = rdbStore;
      // 创建表
      rdbStore.executeSql(this.sqlCreateTable);
    }).catch((err: string) => {
      console.log("getRdbStore err." + JSON.stringify(err));
    });
  }
}