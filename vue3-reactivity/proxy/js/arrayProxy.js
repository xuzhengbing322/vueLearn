let arr = [
      { name: '小徐', age: 18},
      { name: '小张', age: 19},
      { name: '小王', age: 20},
      { name: '小李', age: 21}
]

//将arr做为Proxy()的实参。
let proxy = new Proxy(arr, {
      get (arr, prop) {
            return arr[prop]
      },
      set (arr, prop, value) {
            arr[prop] = value;
      }
})

console.log(proxy[0])
proxy[1] = { name: '小毛', age: 28}
console.log(proxy)