// import dataRdb from '@ohos.data.rdb' //原模块名
// import dataRdb from '@ohos.data.relationalStore'
import { relationalStore } from '@kit.ArkData';
import promptAction from '@ohos.promptAction';
import { Rdb } from './Rdb'
import { User } from './User'
import { ArrayList } from '@kit.ArkTS';
class UserAPI {
  private tableName: string = 'user'
  private columns: Array<string> = []
  private rdb: Rdb | null = null
  private ready: Promise<void> | null = null
  private sql_create_table = ''
  constructor( ) {
    this.columns = ['userId', 'name', 'gender', 'email', 'password']
    this.sql_create_table = 'CREATE TABLE IF NOT EXISTS '
      + this.tableName + '('
      + 'userId INTEGER PRIMARY KEY AUTOINCREMENT, '
      + 'name TEXT NOT NULL, '
      + 'gender TEXT, '
      + 'email TEXT, '
      + 'password TEXT)';
    this.rdb = new Rdb(this.sql_create_table)
    this.rdb.getRdbStore()
  }
  init(): Promise<void> {
    if (this.ready) return this.ready
    this.rdb = new Rdb(this.sql_create_table)
    this.ready = this.rdb.getRdbStore()
    return this.ready
  }
  // 插入数据
  async insertUser(user: User): Promise<void> {
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
  // 根据用户名查询用户信息
  async queryUserByName(name:string) {
    await this.init()
    let resultList:ArrayList<User> | null = null;
    let predicates = new relationalStore.RdbPredicates(this.tableName);
    predicates.equalTo('name', name);
    let ret = await this.queryFromDB(predicates);
    if( ret!=null )
    {
      resultList = this.getListFromResultSet(ret);
    }
    return resultList;
  }
  // 查询全部用户信息
  async queryUserAll() {
    await this.init()
    let resultList:ArrayList<User> | null = null;
    let predicates = new relationalStore.RdbPredicates(this.tableName);
    let ret:relationalStore.ResultSet | null = await
    this.queryFromDB(predicates);
    if( ret!=null )
    {
      resultList = this.getListFromResultSet(ret);
      console.info("=====>"+resultList.convertToArray().toString());
    }
    return resultList;
  }
  // 根据条件查询数据库
  async queryFromDB( predicates:relationalStore.RdbPredicates ) {
    await this.init()
    let resultList:relationalStore.ResultSet | null = null;
    if( this.rdb?.rdbStore!=null )
    {
      let promiseQuery = this.rdb.rdbStore.query(predicates, this.columns);
      await promiseQuery.then((resultSet) => {
        resultList = resultSet;
      }).catch((err:object) => {
        console.log("query err" + JSON.stringify(err));
      });
    }
    return resultList;
  }
  // 将查询到的结果封装用户列表
  getListFromResultSet( resultSet:relationalStore.ResultSet ) {
    let userList:ArrayList<User> = new ArrayList<User>();
    for (let i = 0; i < resultSet.rowCount; i++) {
      resultSet.goToNextRow();
      let user = new User(
        resultSet.getString(resultSet.getColumnIndex('name')),
        resultSet.getString(resultSet.getColumnIndex('gender')),
        resultSet.getString(resultSet.getColumnIndex('email')),
        resultSet.getString(resultSet.getColumnIndex('password')),
        resultSet.getLong(resultSet.getColumnIndex('userId')) );
      userList.add(user);
    }
    return userList;
  }
  // 删除全部数据
  async deleteAll() {
    await this.init()
    let result:number = 0;
    let predicates = new relationalStore.RdbPredicates(this.tableName);
    if(this.rdb?.rdbStore!=null)
    {
    }
    await this.rdb.rdbStore.delete(predicates).then((rows) => {
      result = rows;
      promptAction.showToast({ message: '删除数据，rows:' + rows });
    });
    return result
  }
}
export default new UserAPI()