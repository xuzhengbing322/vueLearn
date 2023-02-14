<template>
  <div class="tool">
      <h3>tool.vue</h3>
    <span>the dog name is {{ name }},his age is {{ age }}</span>
  </div>
</template>


<script>
// 组件命名
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tool",
});
</script>

<script setup >
import {
  isReactive,
  isReadonly,
  isRef,
  reactive,
  readonly,
  ref,
  toRefs,
  unref,
} from "@vue/reactivity";

const name = ref("Huskie");
const data = reactive({
  age: 18,
});
let { age } = toRefs(data);
// readonly返回一个只读的数据对象
const dataOnlyRead = readonly(data);

/*isRef()判断数据是否由ref()创造出来。
isReactive()检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。
*/
if (isRef(name)) {
  console.log("the name created by ref");
} else {
  console.log(" the name didn't create by ref");
}
if (isReactive(data)) {
  console.log("the age of dog created by reactive");
} else {
  console.log("the age of dog didn't create by reactive");
}

// unref 判断数据是否为ref()定义，若是则返回数据的值。
let getNameReturnValue = unref(name);
console.log(`the value of name is ${getNameReturnValue}`);

// isProxy()检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。
// isReadonly()检查一个对象是否是由 readonly() 或 shallowReadonly() 创建的代理。
if (isReadonly(dataOnlyRead)) {
  console.log(`the price created by readonly, age is ${dataOnlyRead.age}`);
}
</script>

<style lang="less" scoped>
.tool{
    width: 500px;
    height: 200px;
    border: 1px solid red;
    margin: 20px 0px;
}
</style>