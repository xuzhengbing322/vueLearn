/*defineProperty(obj)是劫持数据，即直接处理obj。本质上是对对象的属性进行扩展和设置。
let proxy = new Proxy(obj,) 将obj做为Proxy()参数后，返回代理对象。Proxy并不是数据劫持
Proxy是处理obj以后返回一个代理对象proxy。通过操作代理对象proxy去对数据进行操作。

*/

/*target目标对象，即要处理的对象。handler是容器，它装载了无数可以处理对象属性的方法。
handler和defineProperty中的descriptors类似，只是少了属性名。原因是，defineProperty()
是定义属性，target中没有prop，因此需要设置参数2表示属性名。然而，proxy()的参数target本身
就有属性，然后通过处理target对象来达到响应的目的。因此Proxy()没有设置属性名的参数。Proxy()
并不管你增不增加属性，它只管如何处理对象中的属性。
      自定义对象属性的获取、赋值、枚举、函数调用等功能。也就是说，handler中可以写很多相关于
获取、赋值、枚举、函数调用等功能的方法。然后来操作你对target对象中属性的一系列操作的具体实施
办法。普通操作对象的时候只能是默认的响应。但是一旦加了handler写了相应的方法以后，就会根据
handler里面的这些方法来去对应着target对象的操作。也就是说，handler是对操作对象属性的一些
描述。proxy()和defineProperty()可以实现相同的结果，然而它们实施的流程和底下的原理是完全
不同的。
      proxy代理target对象。当访问proxy.a的时候，其实是代理到target中访问a。因此Proxy代理对象
内部存在[[target]]变量。proxy对象中没有直接的数据属性，它只有Handler\Target\IsRevoked。

      Proxy所有的内部方法转发给target，调用Proxy的方法之后，他就会去调用target响应的方法。handler
中的方法都是重写Proxy内部的方法。外界每次通过proxy去访问target对象的属性的时候，它就会经过handler中
每一个方法。因此我们可以通过重写handler中的一些方法来做一些操作。也就是是说，通过代理的方式，先去操作proxy，
然后通过proxy代理内部的方法即handler中的方法，去操作target对象。proxy的代理和defineProperty()实现的拦截
一点关系都没有
      defineProperty()原则上是用于给对象添加属性，它呢在修改数组的长度、用索引去设置元素的值、数组的push
pop这些方法是无法触发defineProperty()的setter方法。setter是个机制，我们可以用set实现setter机制。
vue中对数组的操作方法都是vue重新写的，而不是原生的方法。这就导致大量的代码非常的重。但是proxy没有这个
问题。
      proxy是代理对象去进行操作。数据劫持是在进行操作源对象的时候，我要进行拦截。我访问target，define
Property处理了target以后，你只要访问target.a。我就要经过get方法。这叫做拦截。proxy没有拦截，它是
代理target去处理问题。直接操作target是没有用的，必须得操作proxy

vue2.0中 data () {
      return {}  //defineProperty就是直接操作这个对象。
}
vue3.0中就可以data: {}//给这个对象做一层代理。

*/
// let obj = new Proxy(target, handler)

// import  { MyProxy } from './myProxy.js'


let target = {
      a: 1,
      b: 2,
      c: 3
}

/* new Proxy()生成实例对象proxy，去代理target对象。当proxy发生改变，target也会发生相同
的改变。因为修改的时候target也修改了。proxy没有什么神奇的地方，只是给target添加了些属性的
处理方法。真正读取和修改的时候，依旧读取和修改的是target中的属性。proxy对象只是target的
代理。

*/
let proxy = new Proxy(target, {
      /*获取，访问target对象中的属性时就会执行get函数。
      target是参数1target。prop是target对象中被访问的属性。
      */
      get(target, prop) {
            console.log("target", target, "prop", prop)
            return `This is property value ${target[prop]}`
      },
      /*赋值，赋值target对象的属性时就会执行set函数。
      target是参数1target。prop是target对象中被赋值的属性。value是给属性要赋的值。
      */
      set(target, prop, value) {
            // 修改属性
            target[prop] = value;
            console.log("target", target, "prop", prop, "value", value)
      },

      deleteProperty (target, prop) {
            delete target[prop]
      }

});

// proxy是代理对象，它有自己的get/set方法。target是源对象，所以正常输出。
console.log(proxy.a)
console.log(target.a)
proxy.b = 3;
delete proxy.c


//target传入后会被处理。处理的target最终返回的不应该是target，而应该是target的复制本
function MyProxy(target, handler) {
      let _target = deepClone(target);
      Object.keys(_target).forEach((key) => {
            // 实际上Proxy中具有Object的14重方法
            Object.defineProperty(_target, key, {
                  get() {
                        // 获取对象属性时，判断handler中是否有get方法，如果有就执行get(target, key)
                        return handler.get && handler.get(target, key)
                  },
                  set(newValue) {
                        // 设置对象属性时，判断handler中是否有set方法，如果有就执行set(target, key, newValue)
                        handler.set && handler.set(target, key, newValue)
                  }
            });
      });

      return _target;

      // 深拷贝target
      function deepClone(origin, target) {
            var target = target || {},
                  toStr = Object.prototype.toString,
                  arrType = '[Object Array]';

            for (var key in origin) {
                  if (origin.hasOwnProperty(key)) {
                        if (typeof (origin[key]) === 'object' && origin[key] !== null) {
                              target[key] = toStr.call(origin[key]) === arrType ? [] : {}
                              deepClone(origin[key], target[key])
                        } else {
                              target[key] = origin[key]
                        }
                  }
            }
            return target;
      }
}

let myProxy = new MyProxy(target, {
      get(target, prop) {
            return 'GET:' + prop + ' = ' + target[prop]
      },
      set(target, prop, value) {
            target[prop] = value;
            console.log( 'SET:' + prop + ' = ' + value )
      }
})

console.log("myproxy", myProxy.a);
myProxy.b = 6;
console.log(myProxy.b )

let proxyf = new Proxy(target, {
      get (target, prop) {
            //return target[prop] //这个方法只是取值的方法，而不是函数式的方法。
            return Reflect.get(target, prop)

            /*Reflect 反射，它是ES6内置对象，它是方法集合的容器。Object的14种方法，这里面除了枚举
            没有，其他都有。原因是，我们很多的对象方法直接都放在Object上面。但是实际上很多方法都不是
            直接操作Object，有可能操作函数，有可能操作的是数组。这种情况都放在Object中就不合理。所以
            ES6出了专门的对象Reflect。target[prop] 这个方法只是取值的方法，而不是函数式的方法。
            我们希望通过函数式的东西去操作对象。Reflect.get(target, prop)这种方式就显得更合理一些，
            因为它是用方法去取值。 Reflect这种方法还可以获取结果。即有返回值。
                  Object.prototype中有很多方法，但是Reflect相当于js语言内部的方法集合的新的容器。未来有很多的方法
            都将会逐步的放入到Reflect当中。而不是放到Object中。 因为Object本身是构造对象的构造函数。
                  proxy中handler的方法都是和Reflect一一对应。
                  Reflect是全局对象。直接存放静态方法，因此可以直接访问它的方法
            
            */ 
      },
      set (target, prop, value) {
            const isOk = Reflect.set(target, prop, value) //target[prop] = value
            if (isOk) {
                  console.log('success')
            }
      }
})

console.log(proxyf.a)
proxyf.b = 8

console.log(proxyf.b)