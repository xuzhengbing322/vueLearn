//target传入后会被处理。处理的target最终返回的不应该是target，而应该是target的复制本
function MyProxy(target, handler) {
      let _target = deepClone(target);
      Object.keys(_target).forEach((key) => {
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
            let target = target || {},
                  toStr = Object.prototype.toString,
                  arrType = '[Object Array]';

            for (let key in origin) {
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

export {
      MyProxy
}