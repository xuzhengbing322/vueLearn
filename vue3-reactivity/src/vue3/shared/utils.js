function isObject (value) {
      return typeof value === 'object' && value !== null;
}

// 查看target中是否有key属性。如果存在返回true，如果不存在返回false。
function hasOwnProperty (target, key) {
      return Object.prototype.hasOwnProperty.call(target, key)
}

function isEqual (newValue, oldValue) {
      return newValue === oldValue
}

export {
      isObject,
      hasOwnProperty,
      isEqual
}