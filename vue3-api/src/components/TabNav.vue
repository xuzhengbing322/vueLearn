<template>
  <!-- v-tab是指令。参数1是静态属性，参数2是动态属性，参数3是curIdx。当curIdx变化的时候，即选项切换时
  就会执行指令，即执行js代码。每次一切换选项，
   -->
  <div
    class="tab"
    @click="handleTabClick($event)"
    v-tab="{
      className: 'item-btn',
      activeClass: 'active',
      curIdx,
    }"
  >
    <!-- <button data-index="0" :class="['tab-btn', {'active': curIdx === 0}]">选项一</button>
    <button data-index="1" :class="['tab-btn', {'active': curIdx === 1}]">选项二</button>
    <button data-index="2" :class="['tab-btn', {'active': curIdx === 2}]">选项三</button> -->
    <button data-index="0" class="item-btn">选项一</button>
    <button data-index="1" class="item-btn">选项二</button>
    <button data-index="2" class="item-btn">选项三</button>
  </div>
</template>

<script>
import { tab } from '../directives'
import { ref } from 'vue'

export default {
  name: "TabNav",
  //自定义的指令需要引入和注册才能使用。   
  directives: {
    tab,
  },
  setup() {
    // 选项的序号，初始值为0。
    const curIdx = ref(0);
    // e.target是触发事件的DOM元素，e.target.className可以获取当前点击元素的className类
    const handleTabClick = (e) => {
      const tar = e.target;
      const className = tar.className;

      console.log("e", e, "tar", tar, "tar.dataset", tar.dataset);
      if (className === "item-btn") {
        // tar.dataset.index是点击元素的data-index属性的值，将String类型的值转换成Number类型。
        const index = parseInt(tar.dataset.index);
        // curIdx是当前元素的序号，更改curIdx的值，以便将当前点击元素的序号传递给自定义指令
        curIdx.value = index;
      }
    }

    return {
      handleTabClick,
      curIdx
    }
  },



};
</script>

<style>
  .item-btn.active {
    background-color: green;
    color: azure;
  }
</style>
  