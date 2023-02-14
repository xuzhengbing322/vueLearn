<template>
  <div class="child">
    <h3>this is children component</h3>
    <div>My father has a cat, the cat name is {{name}},today is {{age}} year old</div>
    <button @click="sendDogMessage">send dog message</button>
    <!-- 插槽位置 -->
    <slot></slot>
    <slot name="getName"></slot>
    <!-- 将父组件传递给子组件的数据habit放入data -->
    <slot name="otherName" :data="habit"></slot>
  </div>
</template>


<script setup lang="ts">
import {reactive, toRefs } from "vue";

/*props是子组件接受父组件的
*/ 

// js的props属性方式：variableNamePassed会接受父组件给子组件的同名属性的值
// const props = defineProps({
//   variableNamePassed:{
//       type: Array,
//       default: () => []
//   }
// });


// defineProps接受父组件传给子组件的数据
// 无默认值的情况
// const props = defineProps<{
//   name:string,
//   age:number
// }>()

// 有默认值的情况
interface Props{
  name:string,
  age:number,
  habit:string
}

const props = withDefaults(defineProps<Props>(),{
  name:"mimi",
  age:1,
  habit:""
})

// 如果reactive()定义的属性和props接收的属性同名，template会以props定义的属性为主。
let dog = reactive({
  dogName:"Huskie",
  dogAge:2,
  dogEat:"meat"
})
let {dogName,dogAge,dogEat} = toRefs(dog)
// difineExpose好像只能暴露ref数据。暴露数据之后，父组件就能够通过子组件的标签节点获取暴露数据。
defineExpose({dogEat})





// defineEmits表明自定义事件是clickHandler，参数是params。
const emit = defineEmits<{
  (e:'clickHandler',parmas:(string|number)[]):void
}>()

// 触发父组件中的自定义事件clickHandler，即执行自定义事件所指向的函数。[]是函数的参数。
const sendDogMessage = ()=>{
  emit('clickHandler',[dog.dogName,dog.dogAge])
}




/* js的emit写法：defineEmits定义自定义事件，不定义参数。
emit('selectChange',value)是触发父组件的自定义事件selectChange，即执行自定义事件所指向的函数。value就是函数的参数。
通过自定义事件，子组件可以调用父组件的函数，并通过参数实现数据的传递。
*/
// 子组件
// const emit = defineEmits(['selectChange'])

// const selectChanges = (value) => {
//     emit('selectChange',value)
// }

// 父组件
// <child @selectChange="xxxx" />

</script>

<style lang="less" scoped>
.child {
  width: 500px;
  height: 200px;
  border: 1px solid red;
  margin: 20px 0px;
}
</style>