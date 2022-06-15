/**
 * Storage 二次封装
 */
/**
 * Storage二次封装
 * @author JackBean
 */
// 导入 config 文件，获取 namespace 的值，用来设置本地存储的名称
import config from './../config'   
export default {
    // 写入值
    setItem(key,val){
        let storage = this.getStroage();
        storage[key] = val;
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    //获取某个值
    getItem(key){
        return this.getStroage()[key]
    },
    //获取全部值
    getStroage(){
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
    },
    // 删除某个值
    clearItem(key){
        let storage = this.getStroage()
        delete storage[key]
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    // 删除所有值
    clearAll(){
        window.localStorage.clear()
    }
}