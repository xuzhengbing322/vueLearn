import Observer from './observer'

function observe (data) {
      // 观察vm._data，如果不是对象或是null，就不进行观察。
      if (typeof data !== 'object' || data === null) return
      // 如果是对象，就要观察数据，
      return new Observer(data)
}

export default observe