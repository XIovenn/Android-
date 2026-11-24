import promptAction from '@ohos.promptAction';
import relationalStore from '@ohos.data.relationalStore'
import { UserModel,UserInfo  } from '../model/UserModel'
import { Rdb } from '../db/Rdb'
class UserAPI {
  private tableName: string = 'userT'
  private columns: Array<string> = []
  private rdb: Rdb = null
  private ready: Promise<void> | null = null
  private sql_create_table = ''
  constructor() {
    this.sql_create_table = 'CREATE TABLE IF NOT EXISTS ' + this.tableName
      + '('
      + 'userId INTEGER PRIMARY KEY AUTOINCREMENT, '
      + 'name TEXT NOT NULL, '
      + 'gender TEXT, '
      + 'email TEXT NOT NULL, '
      + 'password TEXT)'
  }
  init(): Promise<void> {
    if (this.ready) return this.ready
    this.rdb = new Rdb(this.sql_create_table)
    this.ready = this.rdb.getRdbStore()
    return this.ready
  }
  // 插入数据
  async insertUser(user: UserModel): Promise<void> {
    await this.init()                    // ← 等 store 就绪
    if (!this.rdb || !this.rdb.rdbStore) throw new Error('rdbStore is null')
    const valueBucket = JSON.parse(JSON.stringify(user));
    return new Promise((resolve, reject) => {
      this.rdb!.rdbStore.insert(this.tableName, valueBucket, (err, ret) => {
        if (err) { console.error('insert failed:', err); reject(err); return }
        console.log('insert done: ' + ret)
        promptAction.showToast({ message: '添加用户成功！' })
        resolve()
      })
    })
  }
  // 根据Email查询用户信息
  async queryUserByEmail(email) {
    await this.init()
    let resultList;
    let predicates = new relationalStore.RdbPredicates(this.tableName);
    predicates.equalTo('email', email);
    let ret = await this.queryFromDB(predicates);
    resultList = this.getListFromResultSet(ret);
    return resultList;
  }
  // 根据条件查询数据库
  async queryFromDB(predicates) {
    await this.init()
    let resultList;
    let promiseQuery = this.rdb.rdbStore.query(predicates, this.columns);
    await promiseQuery.then((resultSet) => {
      resultList = resultSet;
    }).catch((err) => {
      console.log("query err" + JSON.stringify(err));
    });
    return resultList;
  }
  // 将查询到的结果封装用户列表
  getListFromResultSet(resultSet) {
    let userList = [];
    for (let i = 0; i < resultSet.rowCount; i++) {
      resultSet.goToNextRow();
      let user = new
      UserModel(resultSet.getDouble(resultSet.getColumnIndex('userId')),
        resultSet.getString(resultSet.getColumnIndex('name')),
        resultSet.getString(resultSet.getColumnIndex('gender')),
        resultSet.getString(resultSet.getColumnIndex('email')),
        resultSet.getString(resultSet.getColumnIndex('password')));
      userList.push(user);
    }
    return userList;
  }
}
export default new UserAPI()