<template>
  <div class="message">
    <h1>This is an message page</h1>
    <!-- <router-link to="/home/message/detail">Details</router-link> -->
    <router-link :to="{name:'detail',query:{name:name}}">Details</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

let data = reactive({
  name: "tom",
});
let {name} = toRefs(data)

// beforeRouteEnter无法在setup中使用，基本被弃用了。

/*在当前路由改变，但是该组件被复用时调用。
举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
注意：第一次进入组件时，这个钩子不会调用。
*/
// onBeforeRouteUpdate((to,from)=>{
// })

// 在导航离开渲染该组件的对应路由时调用。一般用于离开组建的提示操作
onBeforeRouteLeave((to, from) => {
  if (confirm("你确定要离开吗？")) {
    return true;
  } else {
    return false;
  }
});

// beforeRouteEnter:(to, from, next) =>{
//   debugger
//   console.log(data.name);
//   next((vm) => {
//     console.log(vm);
//   });
// }
</script>