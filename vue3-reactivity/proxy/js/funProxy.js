let fn = function () {
      return `i am a function`
}

fn.a = 123
let newFn = new Proxy(fn, {
      get (fn, prop) {
            return fn[prop] + 'it is a proxy funciton'
      }
})

console.log(newFn.a)