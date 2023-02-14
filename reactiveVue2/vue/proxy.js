/*target就是_data。给vm添加key属性，当访问vm.key时，就拦截访问，并执行get。实际上访问的是vm._data.key。
实现访问数据从vm._data.title => vm.title  vm.title = xxx => vm._data_title = xxx
*/ 

function proxyData (vm, target, key) {
      Object.defineProperty(vm, key, {
            get () {
                  return vm[target][key];
            },
            set (newValue) {
                  vm[target][key] = newValue;
            }
      })
}

export default proxyData  