import observe from "./observe";

function defineReactiveData (data, key, value) {
      // value可能还是对象，因此要递归的观察
      observe(value)

      // 访问属性key的时候进行数据拦截。实现响应式数据。
      Object.defineProperty(data, key, {
            get () {
                  console.log('响应式数据：设置', value);
                  return value;
            },
            // newValue可能是数组或对象，因此还需要观察一下。
            set (newValue) {
                  console.log('响应式数据：设置', newValue);
                  if (newValue === value) return;
                  observe(newValue);
                  value = newValue; 
            }
      })
}

export default defineReactiveData