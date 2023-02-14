import proxyData from "./proxy";
import observe from './observe';

function initState (vm) {
      // 取出实例对象中的options
      var options = vm.$options;

      if (options.data) {
            initData(vm);
      }
}

function initData (vm) {
      /*在vm挂载一个data的时候，我们希望data是临时的data，来保留用户的data原本。因为我们在操作的过程
      当中，是不希望直接去操作用户直接设置的东西。我们更希望在初始化的时候，先用临时的data去保存它。
      */ 
      var data = vm.$options.data;

      /*如果用户写的data是函数，则执行data()返回数据对象，this指向vm实例对象。如果用户写的data是
      对象，则data就是data对象。如果是其他情况，则data为空对象。然后把结果赋值给vm._data，
      _data是临时变量。然后再把临时变量赋给data。这样操作data实际上操作的是vm._data。
      data.call(vm)：
      
      */ 
      vm._data = data = typeof data === 'function' ? data.call(vm) : data || {};

      /*实现访问数据从vm._data.title => vm.title。
      当访问data的属性的时候，就执行get。
      */ 
      for (var key in data) {
            proxyData(vm, '_data', key)
      }

      observe(vm._data)
}

export {
      initState
}