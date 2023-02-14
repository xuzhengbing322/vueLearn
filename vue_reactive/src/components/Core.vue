<template>
  <div class="core">
    <h3>core.vue</h3>
    姓名：{{ name }} 全名：{{ trueName }} 年龄：{{ age }} 学号：{{ number }}
    <br />
    <!-- v-model="trueName"：由于trueName由name组成，因此修改trueName时，name也会被修改 -->
    修改全名：<input type="text" v-model="trueName" />
    <ul>
      <span>爱好：</span>
      <li v-for="(like, index) in hobit" :key="index">
        {{ like }}
      </li>
    </ul>
    学校：{{ profession }}
    <br />
    <button @click="add">年龄加1</button>
    <button @click="changeStudentNumber">修改学号</button>
    <div ref="getDom">获取dom节点</div>
    <!-- <div>agefunction is called{{ ageFun() }}</div>
    <div>agefunction is called{{ ageFun() }}</div>
    <div>ageComputed is called{{ ageComputed }}</div>
    <div>ageComputed is called{{ ageComputed }}</div> -->
  </div>
</template>


<script>
// 组件命名
import { computed, defineComponent, onMounted, watchEffect } from "vue";
export default defineComponent({
  name: "Core",
});
</script>

<script setup  >
// setup语法糖中无法使用this。使用的api都需要从vue中引入。
import { reactive, toRefs, toRef, ref, watch } from "vue";

/*响应式数据ref()
  ref()把普通数据变成响应式数据。它的返回值是RefImpl{.... value:(...)}对象(引用对象)。
  template中直接通过ref定义的变量名来使用数据，但在函数中需要通过变量名.value来使用数据。

  响应式原理：vue3通过Object.defineProperty()实现数据代理，用RefImpl对象中的value代理__proto__中的value。
然后，vue3用__proto__中的value代理ref()的值（用户定义的值），并且做了数据劫持。因此当值发生变化后，模版重新渲染。
*/
let number = ref("001");
let getDom = ref(null);

/*获取template中的dom：使用ref标签属性标识template中的dom，然后用ref()创建同名变量。通过变量名.value就能获取dom
注意，setup是vue的created生命周期，此时只能操作数据，不能操作dom。所以一般在onMounted生命周期或函数中操作dom
*/
console.log("##", getDom.value); //## null
onMounted(() => {
  console.log("@@", getDom.value); //@@ <div>获取dom节点</div>
});

// 响应式对象reactive()
let data = reactive({
  name: "tom",
  surname: "Joke",
  age: 19,
  hobit: ["eat", "sleep", "drink"],
  school: {
    university: {
      professional: "industrial",
    },
  },
});

/*  计算属性computed()
    计算属性就是用已有的属性来生成新的属性，计算属性也是响应式数据。注意：计算属性要写在toRefs()之前，数据才能被toRefs处理。
    计算属性通过get()/set()来书写。读取计算属性时调用get()，生成属性值并返回。修改计算属性时调用set()，做相应的操作。
如果计算属性值考虑读取，不考虑被修改，才可以使用简写。
*/
// data.trueName =  computed(()=>{
//   return data.surname + "-" + data.name
// })
data.trueName = computed({
  get() {
    return data.surname + "-" + data.name;
  },
  // datas是用于修改trueName的值。
  set(datas) {
    let [a, b] = datas.split("-");
    data.surname = a || "";
    data.name = b || "";
  },
});
// data.trueName = "Mark-tom"

/*
    简化数据在模版的书写：toRef()/toRefs
  toRef()基于响应式对象上的一个属性，创建一个对应的ref。这样创建的ref与其源属性保持同步：改变源属性的值将更新ref的值，反之亦然。
  toRefs()将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的ref。每个单独的ref都是使用toRef()创建的。
  toRef()和toRefs()将data中的响应式数据变为ObjectRefImpl。vue3的template能读取RefImpl中的value值。从而实现template中的数据简写。
  toRef()和toRefs()创建的ref和data平级，且同步。因此在函数中使用数据时，可以通过name.value和data.name来获取数据。
  toRefs()只能处理响应式对象顶层的数据，其他的数据只能通过toRef完成
*/
let { name, age, hobit, trueName } = toRefs(data);
// 将data.school.university.professional的值返回给returnValue
let profession = toRef(data.school.university, "professional");

// templat中，vue3能读取RefImpl中的value值。toRefs将data.name变为引用对象RefImpl，从而实现模板中直接使用变量
// console.log(number); //引用对象RefImpl
// console.log(name); // 对象引用对象ObjectRefImpl
// console.log(data.name); //tom

// 函数使用响应式对象中的属性时，需要完整写好属性的路径。
function add() {
  data.age = data.age + 1;
}

// 函数使用响应式数据中的数据时，需要在后面加.value读取数据的值。
function changeStudentNumber() {
  number.value = "002";
}

/*computed的缓存机制：当多次调用同一个计算属性时，如果计算属性依赖的变量值没有改变，就会从缓存中获取计算属性值，
而不是再次调用计算属性的函数来获取值。
  funtion就没有缓存机制，如果多次调用函数，函数就会执行多次。
*/

const ageFun = () => {
  console.log(" The funciton is called");
  return data.age + 10;
};

const ageComputed = computed(() => {
  console.log("The computed is called");
  return data.age + 10;
});

/*watch侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。watch监视的参数只写参数名即可，不用写.value
watch监听的变量如果是Ref数据对象，则直接写变量名即可。ref()定义的参数，以及reactive()定义但用toRef/toRefs()转换后的变量都是Ref数据对象
watch监听的变量如果是reactive数据时，需要通过函数的形式写变量。
监视多个响应式数据用数组。因此，newValue和oldValue也是数组。
*/
watch(
  [age, number],
  (newValue, oldValue) => {
    console.log(
      `the age chenged, new value is  ${newValue}, old value is ${oldValue}`
    );
  },
);

watch(
  [
    () => data.name,
    () => data.surname,
    () => data,
  ],
  ([newName, newSurname, newPro], [prevName, prevSurname, oldPro]) => {
    console.log(
      `People name chenged, new value is ${[
        newName,
        newSurname,
        newPro,
      ]}, old value is ${[prevName, prevSurname, oldPro]}`
    );
  },
  {
    // 立即执行，页面加载完成后就监听一次，旧值为undefined
    immediate: true,
    // 深度监听。当监听的数据是多层对象中的数据时，启动深度监听，只监听根对象，那么根对象中的任何数据发生变化都可以监听到。
    deep:true
  }
);

setTimeout(()=>{
  data.school.university.professional = "point"
},1000)

// 异步函数，当数据改变后，watchEffect会执行，并执行异步函数。
const textAsync = (id)=>{
  return setTimeout(()=>{
    console.log("the age is ",id);
  },3000)
}

/*watchEffect是立即执行函数，页面加载后就会执行一次。
watchEffect可以监听函数里使用的数据，当数据发生变化时，就会执行函数。
*/ 
const stopWatch =  watchEffect( async (onCleanup)=>{
  const timer = textAsync(data.age)
  // 只有依赖响应的变量发生变化时，才会执行onCleanup。它可以用来实现防抖，
  onCleanup(()=>{
    console.log("oncleanup run!")
    // 清除之前执行产生的定时器（定时器3秒才执行，时间还没到，可以被清除），只保留最后执行产生的定时器。
    clearTimeout(timer)
    

  })
})
// 将watchEffect赋给变量。执行变量就可以停止监听器。
// stopWatch()

setTimeout(()=>{
  data.age ++
},2000)



</script>

<style scoped lang="less">
.core{
  width: 500px;
  height: 400px;
  border: 1px solid red;
}

</style>