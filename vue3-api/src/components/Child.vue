<template>
  <h3>{{ hobby }}</h3>
  <button @click="changeName">change Name</button>
</template>

<script>
import { getCurrentInstance, inject } from "@vue/runtime-core";

export default {
  name: "Child",
  // props: {
  //       title: String
  // },
  setup() {
    const hobby = inject("hobby", "loading...");
    const changeName = inject("changeName");

    // globel
    const { ctx } = getCurrentInstance();  //这个ctx是当前组件实例的上下文。setup的ctx参数是setup执行的时候的上下文。
    console.log("*****", ctx); //找不到全局属性。

    return {
      hobby,
      changeName,
    };
  },
};
</script>

