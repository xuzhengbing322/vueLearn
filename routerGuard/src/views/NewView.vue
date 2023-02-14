<template>
  <div class="news">
    <h1>This is an new page</h1>
    <ul>
      <li :style="{ opacity }">欢迎学习vue</li>
      <li>news001 <input type="text" /></li>
      <li>news002 <input type="text" /></li>
      <li>news003 <input type="text" /></li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { onActivated, onDeactivated } from "@vue/runtime-core";

let data = reactive({
  opacity: 1,
  timer:""
});
let { opacity } = toRefs(data);

/* 当一个组件实例从 DOM 上移除但因为被 <KeepAlive> 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。
当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活。
*/
onActivated(() => {
  // 在首次挂载、以及每次从缓存中被重新插入的时候调用
  console.log("News组件被激活");
  data.timer = setInterval(() => {
    console.log("@");
    data.opacity -= 0.01;
    if (data.opacity <= 0) data.opacity = 1;
  }, 16);
});

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存，以及组件卸载时调用
  console.log("News组件失活了");
  clearInterval(data.timer);
});
</script>