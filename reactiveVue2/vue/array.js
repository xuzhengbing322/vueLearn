import { ARR_METHOS } from "./config";
import observeArr from "./observeArr";

// 创建一个以数组原型为原型的对象。
var originArrMethods = Array.prototype,
      arrMethods = Object.create(originArrMethods);

// 将ARR_METHOS的元素项做为arrMethods的属性
ARR_METHOS.map(function (m) {
      // 重写这些方法。功能让原来的方法做，但是在函数内部我还可以做其他的事情。例如观察增加项是否为数组或对象
      arrMethods[m] = function () {
            // 方法的参数不固定，pop就只有一个，而slice有三个。arguments是类数组，通过slice()返回数组的特性，将arguments变成数组。
            var args = Array.prototype.slice.call(arguments),
            // 将apply()的this指向从originArrMethods[m]方法变为调用originArrMethods的数组，参数为args。
            rt = originArrMethods[m].apply(this,args)
            console.log('数组新方法', args);
            // 接收参数的数组，也就是获取新增的元素项。
            var newArr;

            switch (m) {
                  case 'push':
                  case 'unshift':
                        newArr = args;
                        break;
                  case 'splice':
                        // 将splice的第三项参数变成数组元素项取出来。
                        newArr = args.slice(2);
                        break;
                  default:
                        break;
            }

            // 如果newArr存在，就通过observeArr()给新增元素项做响应式处理。
            newArr && observeArr(newArr);
            // 这个返回没有实际意义。
            return rt;
      }
})

export {
      arrMethods
}