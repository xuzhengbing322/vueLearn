 # 生命周期
      生命周期函数在Vue执行的关键时刻调用的函数。Vue3.0中生命周期函数总共有：onBeforeMount、
onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted、onErrorCaptured()、onRenderTracked()、onRenderTriggered()。Vue2.0中的beforeCreate和created生命周期合并到setup API中。生命周期函数都是依赖内部的全局状态去定位到当前激活的组件实例，因此生命周期函数只能在setup API中使用。
      setup(){}：初始化生命周期、事件和数据代理。
      onBeforeUpdate():函数在组件被挂载之前调用。当函数被调用时，组件已经完成了其响应式状态的设置。所
以onBeforeMount()可以调用setup()中的数据和方法。但Vue还没有渲染HTML的DOM结构，因此无法对DOM进行作。
      onBeforeMount()和onMounted()之间：Vue解析模版，生成虚拟DOM，然后将虚拟DOM转为真实DOM并插入页
面。此时DOM树就挂载到el中，页面就渲染出来了。vue会将真实DOM存一份在app.$el中，如果以后Diff算法有需要复用真实DOM的地方，就从这里面拿。
      onMounted()：函数在在组件挂载完成后执行。此时页面中呈现的是经过Vue编译的DOM，所以对DOM的操作
均有效。至此初始化过程结束，一般在此进行：开启定时器、发送网络请求、订阅信息、绑定自定义事件等初始化操作。
onMounted()只在模版初始化时调用一次，以后重新解析模版，onMounted()不执行。  
      onBeforeUpdate()：函数在组件即将因为响应式状态变更而更新其DOM树之前调用。此时数据是新的，页面是
旧的，即页面尚未和数据保持同步。如果此时调用数据，调用的就是新数据而非旧数据。函数可以用来在Vue更新DOM之前之前访问DOM状态。
      onBeforeUpdate()和onUpdated()之间：根据新数据，生成新的虚拟DOM，随后与旧的虚拟DOM进行比较，生
成新真实DOM，完成页面渲染。
      onUpdated()：函数在组件因为响应式状态变更而更新其DOM树之后调用。此时数据是新的，页面也是新的，
即：页面和数据保持同步。
      onBeforeUnmount()：函数在组件实例被卸载之前调用。此时组件实例依旧还保有全部的功能。
      onUnmounted()：函数在组件实例被卸载之后调用。一般在函数中手动关闭计时器、DOM事件监听器、与服务器
的连接等。一个组件在以下情况下被视为已卸载：（1）其所有子组件都已经被卸载。（2）所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止。
      onErrorCaptured()：子孙组件的错误，父组件可以通过这个方法获取到这些错误。
      onRenderTracked()：追踪render的行为。在函数体中写debugger，可以追踪render走的每一步。
      onRenderTriggered()：追踪render触发时候的行为。在函数体中写debugger，可以追踪render重新渲染
的时候，走的每一步。
  

