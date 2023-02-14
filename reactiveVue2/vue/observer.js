// {} defineProperty  [] 自己去写方法
import defineReactiveData from './dataReactive'
import { arrMethods } from './array';
import observeArr from './observeArr';


// 观察者
function Observer (data) {
      /*判断data是不是数组。对数组数据变成响应式数据。defineProperty本身是劫持对象，而非劫持数组。
      因此，我们不希望直接用数组原型中的方法去更改数组。其次，例如posh、shift等方法会新增一个数据项。
      而这一项我们需要再次监控它是不是数组，是不是对象，或者是其他原始值。这就很复杂。如果用array原型
      本身的方法没办法做到这些事情。因此，我们需要重写一遍array上面关于数组的方法。
      
      */ 
      if (Array.isArray(data)) {
            // 更改data底下操作array的方法。这样就会先使用我更改的方法
            data.__proto__ = arrMethods;
            // data数组的元素项可能也是数组或对象，因此也需要观察，这样才能把所有的数据设置成为响应式。 
            observeArr(data);
      } else {
            this.walk(data);
      }
}

// 观察者给data设置数据劫持
Observer.prototype.walk = function (data) {
      // 把data对象的属性key和value重新进行定义。
      var keys = Object.keys(data);

      for (var i = 0; i < keys.length; i++) {
            // 拿到key和value，才好用defineProperty
            var key = keys[i],
                  value = data[key];

            defineReactiveData(data, key, value)
      } 
}

export default Observer
