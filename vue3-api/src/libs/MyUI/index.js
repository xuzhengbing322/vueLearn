// 本文件，引入标签，然后注册标签。
import MyButton from './MyButton.vue';
import MyInput from './MyInput.vue';

// 组件池，将所有的第三方标签都写入其中，以便注册使用。
const componentPool = [
      MyButton,
      MyInput
]


export default {
      // options：接收的是app.use(MyUI, {})的第二个参数的内容
      install(app, options) {
            if (options.components) {
                  // 循环components数组元素，执行函数体中的代码
                  options.components.map((compName) => {
                        // 循环componentPool数组元素，并执行函数体中的代码
                        componentPool.map((comp) => {
                              // 如果components的数组元素存在于componentPool数组中，则注册。从而实现按需注册。
                              if (compName === comp.name) {
                                    // 在app中注册第三方标签。整个项目都能使用。
                                    app.component(comp.name, comp)
                              }
                        })
                  })
            } else {
                  componentPool.map((comp) => {
                        app.component(comp.name, comp)
                  })
            }
      }
}