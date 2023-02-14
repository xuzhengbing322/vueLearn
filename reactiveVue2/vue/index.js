// 主程序入口
import { initState } from './init'

function Vue (options) {
      this._init(options)

}

// 初始化数据options
Vue.prototype._init = function (options) {
      // 保存实例对象this
      var vm = this;
      // 将options挂载到实例对象中
      vm.$options = options;

      initState(vm);

}

export default Vue;