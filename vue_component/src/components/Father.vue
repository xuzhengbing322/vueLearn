<template>
  <!-- 父传子：defineProps。父组件将子组件需要用到的数据传给子组件。
        子传父：defineEmits  defineExpose。defineEmits通过自定义事件的函数调用，实现子组件传递数据和点击等信息给父组件。
          defineExpose通过ref指定，实现子组件传递数据给父组件。
        插槽：匿名插槽、具名插槽、作用域插槽。父组件中，将子组件标签间的内容渲染到子组件对应的template插槽位置
   -->

  <div class="father">
    <h3>this is father component</h3>
    <div>I have a cat, she name is {{ name }}, age is {{ age }}</div>
    <button @click="addAge">change age</button>
    <button @click="defineExposeFood">defineExpose food</button>
    <!-- :name="name" :age="age" 父组件给子组件传递数据。父组件数据发生修改时，子组件数据也会跟着变。
    @clickHandler="getMessage" 自定义事件clickHandler定义getMessage函数，留给子组件调用。
    ref="food" 标记标签节点，
     -->
    <Child :name="name" :age="age" :habit="habit" @clickHandler="getMessage" ref="food">
      <!-- 匿名插槽直接写内容就好，它会把所有的内容放置插槽位置 -->
      <div>this is anonymity slot</div>
      <!-- 具名插槽：v-slot必须写在template中，不能写在div中。它会把内容渲染到子组件中具有相同名字的插槽 -->
      <template v-slot:getName>
        <div>
            this is named slot
        </div>
      </template>
      <!-- 作用域插槽：将父组件数据传给子组件，然后子组件通过插槽传数据又让父组件可以在v-slot处可以使用该数据，最后将数据渲染到插槽对应的位置 -->
      <template v-slot:otherName="nomalName">
        {{nomalName.data}}
        {{habit}}
        <div>
          this is scope slot
        </div>
      </template>
    </Child>

    <!-- 插槽：匿名插槽、具名插槽、作用域插槽。 -->
  </div>
</template>



<script setup lang="ts" >
import { reactive, toRefs, ref } from "vue";
import Child from "./Child.vue";

let cats = reactive({
  name: "Ragdoll",
  age: 1,
  habit:"run"
});
// 获取Child节点
const food = ref(null);
let { name, age,habit } = toRefs(cats);

const addAge = () => {
  cats.age++;
};

// params就是子组件传递过来的数据
const getMessage = (params: (string | number)[]) => {
  console.log(
    `My children has a dog, his name is ${params[0]},his age is ${params[1]}`
  );
};

const defineExposeFood = () => {
  console.log(`The dog like eat ${food.value.dogEat}`);
};
</script>

<style scoped lang="less">
.father {
  width: 500px;
  height: 400px;
  border: 1px solid red;
}
</style>