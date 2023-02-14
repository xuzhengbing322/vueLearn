/**数据劫持：访问和设置数据的时候，通过get/set方法阻拦正常的访问和设置数据操作，然后按照get/set中的机制
 操作数据。数据其实就是对象。
   javascript是单向数据，而非响应式数据。
   数据的双向绑定实际上就是响应式的编程方式。当我一个方法执行或者是对一个属性进行设置的时候，我希望它有一些
数据上边的响应的能力。也就是说，我的数据变化了，我希望我的视图也跟着会变化。视图中的某些数据发生直接或间接
的变化时，我也希望保存的数据源也发生相应的变化。这背后的逻辑就是响应式编程，也就是说，当一个方法执行的时候，
我希望它有一些额外的操作。这些额外的操作就是，当我这个方法执行的时候，你要给我一个响应，让我知道你执行了，
然后呢我也跟着去执行。这就是响应式的编程方式。
 
 * */ 

import {isObject} from '../shared/utils'
import { mutableHandler } from './mutableHandler.js'

function reactive (target) {
      // reactive()最终返回响应式数据对象
      return createReactiveObject(target, mutableHandler)
}

// 专门用一个函数处理响应式的代理转换。
function createReactiveObject(target, baseHandler){
      // 判断target是否为对象，如果不是则直接返回target，如果是对象才进行proxy包装。
      if (!isObject(target)) {
            return target;
      }

      // observer就是响应式代理对象。
      const observer = new Proxy(target, baseHandler);
      return observer
}

/*
      proxy对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。可以通过get/set拦截
获取和赋值行为，然后做其他的事情。
      target是要使用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组、函数、甚至另一个代理）。
      handler是一个通常以函数做为属性的对象，各属性中的函数分别定义了在执行各种操作时代理proxy的行为。
      Reflect是一个内置的对象，它提供拦截Javascript操作的方法。这些方法与proxy handlers的方法相同。
  也就是说，它们都有set/get等方法。Reflect不是一个函数对象，因为它是不可构造的。
      Reflict一般是和proxy配合着的。Reflict就是一个普通对象。
      Reflict中的方法都具有返回值。
      
      const proxy = new Proxy(target, {
            // receiver代理的原对象
            get (target, key, receiver) {

            },
            set (target, key, value, receiver) {

            }
      })

      Reflect = {
            get,
            set
      }
*/ 

export {
      reactive
}