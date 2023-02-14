import { createApp } from 'vue'
// App是对象，一个组件就是一个对象。
import App from './App.vue'
import * as utils from './libs/utils'
import MyUI from './libs/MyUI';

const app = createApp(App);
app.config.globalProperties.utils = utils;
app.config.globalProperties.msg = 'hello';
// 本项目使用的插件，以及具体所需的组件
app.use(MyUI, {
      // 本项目要用到的第三方组件
      components: [
            'MyButton',
            'MyInput'
      ]
})




//App放入createApp()中会产生App的实例对象，然后将实例对象挂载到appDOM节点上。
app.mount('#app')
