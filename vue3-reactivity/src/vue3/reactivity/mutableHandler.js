/*它就是get和set方法以及其他的方法
{
      get () {},
      set () {},
      deleteProperty() {}
}

*/
import { isObject } from "../shared/utils";
import { reactive } from './reactive'
import { hasOwnProperty, isEqual } from "../shared/utils";

 

// 可能mutableHandler中的方法很多，因此创建一个函数来管理这些方法。也就是单独完成这些方法的定义。

// 单独的声明这些方法。
const get = createGetter(),
      set = createSetter();

// createGetter出来的是一个方法，
function createGetter () {
      return function get (target, key, receiver) {
            const res = Reflect.get(target, key, receiver); //target[key]
            console.log('响应式获取：' + target[key]);

            // 递归实现深度响应式设置。
            if (isObject(res)) {
                  return reactive(res)
            }

            return res;
      }
}

function createSetter () {
      return function set (target, key, value, receiver) {
             // 判断key是否存在于target，如果不存在就是新增的属性。
             const isKeyExist = hasOwnProperty(target, key);

            //  判断新的value是否和老的value相同
            const oldValue = target[key];
            const res = Reflect.set(target, key, value, receiver) //target[key] = value
            // 如果不存在，则为新增属性。
            if (!isKeyExist) {
                  console.log('响应式新增：' + value);
                  // 如果新旧值不相等，就要修改
            } else if (!isEqual(value, oldValue)) {
                  console.log('响应式修改：' + key + '=' + value);
            }

            // console.log('响应式设置：' + key + '=' + value + ',' + target.length)
            return res
      }
}



const mutableHandler = {
      //get: function get () {}
      get,
      set,
}

export {
      mutableHandler
}