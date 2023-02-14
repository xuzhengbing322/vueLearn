<template>
  <h1 :style="{ opacity: opacity }">学习vue</h1>
  <div>{{num}}</div>
  <button @click="add">数量增加</button>
</template>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  reactive,
  toRefs,
} from "vue";

let data = reactive({
  num:10,
  opacity: 1,
});

let { opacity,num } = toRefs(data);

function add(){
  data.num++
  num.value ++
}

/*
服务端渲染是指由服务侧完成页面的HTML结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程。
所有的钩子在服务器端渲染期间都不会被调用。
*/

/* 
beforeCreate()之前：初始化生命周期和事件（定义生命周期函数的数量、名称和调用事件，以及事件修饰符等），但数据代理还未开始。
beforeCreate()：此时无法访问setup中的数据和方法。创建之前是指创建数据监测和数据代理之前。
beforeCreate()和created()之间：初始化数据监视和数据代理。
created()：此时可以访问setup中的数据和方法。
setup()中没有beforeCreate()和create()生命周期配置项对应的钩子，但实现了相同的作用。
因此，setup()会先执行console.log等数据处理语句，然后再执行onBeforeMount(),onMounted(),onBeforeUpdate(),onUpdated,
  onBeforeUnmount,onUnmounted生命周期函数。

随后判断是否有template选项。如果有就编译模版至渲染函数，如果没有就编译el的innerHTML至模版。
*/ 


/*
  onBeforeMount()注册一个钩子，在组件被挂载之前被调用。
当钩子被调用时，组件已经完成了其响应式状态的设置。所以onBeforeMount()可以调用setup()中的数据和方法。
但Vue还没有渲染DOM结构，因此无法对DOM进行操作。它即将首次执行DOM渲染过程


  onBeforeMount()和onMounted()之间：创建app.$el并添加至el。
Vue解析模版，生成虚拟DOM，然后将虚拟DOM转为真实DOM并插入页面。此时DOM树就挂载到el中，页面就渲染出来了。
  vue会将真实DOM存一份在app.$el中，如果以后Diff算法有需要复用真实DOM的地方，就从这里面拿。
*/
onBeforeMount(() => {
  console.log(num)  
  console.log(data.num)
  console.log("----beforeMount----");
});

/*
  onMounted()注册一个回调函数，在组件挂载完成后执行。
此时页面中呈现的是经过Vue编译的DOM，所以对DOM的操作均有效。
至此初始化过程结束，一般在此进行：开启定时器、发送网络请求、订阅信息、绑定自定义事件等初始化操作。
  onMounted()只在模版初始化时调用一次，以后重新解析模版，onMounted()不执行。
  组件在以下情况下被视为已挂载：（1）其所有同步子组件都已经被挂载 (不包含异步组件或 <Suspense> 树内的组件)。
（2）其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。
  这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用，或是在服务端渲染应用中用于确保 DOM 相关代码仅在客户端执行。
*/
// intervalId要在setup中声明，而非onMounted声明。
let intervalId
onMounted(() => {
    intervalId =  setInterval(() => {
    data.opacity -= 0.01;
    if (data.opacity <= 0) return (data.opacity = 1);
  }, 50);
});


/*

  onBeforeUpdate()注册一个钩子，在组件即将因为响应式状态变更而更新其DOM树之前调用。
此时数据是新的，页面是旧的，即页面尚未和数据保持同步。如果此时调用数据，调用的就是新数据而非旧数据。
  这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。

  onBeforeUpdate()和onUpdated()之间：根据新数据，生成新的虚拟DOM，随后与旧的虚拟DOM进行比较，生成新真实DOM，完成页面渲染。
*/

onBeforeUpdate(() => {
  console.log(data.num+1)
  console.log("-----beforeUpdate-----");
});



/*
  onUpdated()注册一个回调函数，在组件因为响应式状态变更而更新其DOM树之后调用。
此时数据是新的，页面也是新的，即：页面和数据保持同步。
  父组件的更新钩子将在其子组件的更新钩子之后调用。
  这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。
  如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。
*/
onUpdated(() => {
  console.log("-----updated-----");
});

/*
  onBeforeUnmount()注册一个钩子，在组件实例被卸载之前调用。当这个钩子被调用时，组件实例依然还保有全部的功能。
*/
onBeforeUnmount(() => {
  console.log("-----beforeUnmount----");
});

/*
  onUnmounted()注册一个回调函数，在组件实例被卸载之后调用。
  一个组件在以下情况下被视为已卸载：（1）其所有子组件都已经被卸载。（2）所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止。
  可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。
*/
onUnmounted(() => {
  console.log("-----unmounted----");
  clearInterval(intervalId)
});

console.log("-----setup----");
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
