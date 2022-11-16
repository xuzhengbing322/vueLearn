<template>
  <div>
    <!-- v-text：更新元素的文本内容。v-html: 更新元素的 innerHTML。它们都会覆盖掉标签件的内容，并且无法和{{}}共用
    它们的区别在于，当数据中含有标签时，v-text会将标签按文本输出，v-html会将标签渲染成DOM。-->
    <!-- <span v-text="message">{{messageTestTest}}</span> error:  v-text will override element children.-->
    <div class="text">
      <div><span v-text="messageText"></span></div>
      <div><span v-html="messageHtml"></span></div>
    </div>

    <!-- v-show/v-if都可以将判断条件转化为布尔值，在进行判断。条件为真就渲染，条件为假就不渲染。
        v-show/v-if的区别是，v-show的判断值为false时，通过display:none来实现不显示元素，但依旧能找到它的DOM元素。
    然而，v-if的判断值为false时，通过移除元素的DOM来实现不显示元素，因此无法找到它的DOM元素。
        适用场景：如果需求有很高的切换频率，建议使用v-show。因为v-show不会反复移除和创建DOM节点，只是动态的控制样式来实现隐藏和显示。
    v-if适用于切换频率比较低的场景。因为v-if会不断的添加和删除节点,存在效率上的问题。
        v-if v-else-if v-else实现多个判断情况。它们必须连着写，不然不奏效。v-else不用写判断条件，非判断条件都执行这条语句
        template只能和v-if使用，不能和v-show使用。它的作用和<div>相同，但它没有DOM节点，不影响结构。 它渲染的内容放在“父标签”中。
    -->
    <div class="judge">
      <div v-show="0">{{ name }}, how are you doing today?</div>
      <div v-show="true">{{ name }}, how are you doing today?</div>
      <div v-if="1 === 1">{{ name }}, how are you doing today?</div>
      <div v-if="false">{{ name }}, how are you doing today?</div>
    </div>
    <div>
      <div v-if="true">{{ name }}, study hard!</div>
      <template v-if="true">{{ name }}, study hard!</template>
    </div>

    <!--
    v-for循环数组/对象时，每有一项数据，就创建一个指定的DOM节点来渲染数据。
    v-for循环一般使用每项数据中独一无二的数据作为key，防止逆序操作带来的问题。如果没有才会用每项数据的索引值作为key。
    虚拟DOM中key的作用：
			key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据新数据生成新的虚拟DOM。随后Vue进行新虚拟DOM与旧虚拟DOM的差异比较。
    比较规则如下：
      如果旧虚拟DOM中未找到与新虚拟DOM相同的key，则创建新的真实DOM，随后渲染到到页面。
      如果旧虚拟DOM中找到了与新虚拟DOM相同的key，若虚拟DOM中内容没变, 直接使用之前的真实DOM；若虚拟DOM中内容变了, 则用新虚拟DOM生成新的真实DOM，随后替换掉页面中之前的真实DOM。
		用index作为key可能会引发的问题：  
      如果对数据进行逆序添加或逆序删除等破坏顺序的操作，旧虚拟DOM和它的key所对应的新虚拟DOM，两者内容将有所不同。
      这样本应该复用的内容没有复用，而是自己生成。页面虽然没有问题，但是效率低。
      如果结构中还包含输入类的DOM：由于vue会复用同一个key中相同内容所对应的真实DOM，可是旧的真实DOM上有输入信息，这就会导致页面显示错误。
		-->
    <div class="circulation">
      <!-- 遍历数组 -->
      <div v-for="fruit in fruits" :key="fruit.id">{{ fruit }}</div>
      <!-- 遍历对象:遍历时先收到value后收到key，顺序别写反了。 -->
      <div v-for="(value, key) in car" :key="key">{{ key }}--{{ value }}</div>

      <h2>人员列表</h2>
      <button @click.once="addPerson">添加一个老刘</button>
      <ul>
        <!--key唯一标识: 身份证，属性key是被vue给征用的，并不反应在真实dom上-->
        <li v-for="person in persons" :key="person.id">
          {{ person.name }} - {{ person.age }}
          <!--为了看到key值的不正确滥用所导致的问题，我们添加一个input框-->
          <input type="text" />
        </li>
      </ul>
    </div>

    <!-- 
    键盘输入事件：keydown是按键按下去就触发事件，keyup是按键按下去松手才触发事件。@keyup.enter当我按下enter键后，才会执行函数
    常见的键名：回车 => enter 删除 => delete  退出 => esc 空格 => space 换行 => tab(必须和keydown使用，不然有焦点问题)
        上 => up 下 => down 左 => left  右 => right
    v-on:xxx/@xxx 绑定事件，其中xxx是事件名。@click="showInfoOther(66)"事件可以接受参数。
    常见的事件修饰符：prevent：阻止默认事件（常用）；	stop：阻止事件冒泡（常用）；once：事件只触发一次（常用）；
     -->
    <div class="evnetBinding">
      <input
        type="text"
        placeholder="please entry some message"
        @keyup.enter="showInfo"
      />
      <button @click="showInfoOther(66)">button</button>
      <div @click="showInfoOther(77)">
        <!-- prevent阻止a标签的默认跳转。stop阻止事件冒泡，防止showInfoOther(77)顺带执行 -->
        <a href="https://www.baidu.com" @click.prevent.stop="showmessage"
          >eventModifier</a
        >
      </div>
    </div>

    <!-- 数据绑定
          单向绑定(v-bind/:)：数据只能从data流向页面，不能从页面中接受数据到data。
    			双向绑定(v-model:value/v-model)：数据可以在data和页面之间同步。主要应用在表单类元素(输入元素)上（如：input、select等）
            表单类元素是与用户交互的元素，它们都有共同的value属性，v-model就是绑定value属性。
          v-model常用事件修饰符：.lazy ——监听change事件而不是input。.number ——将输入的合法符串转为数字。.trim ——移除输入内容两端空格
             -->
    <div class="dataBinding">
      <label
        >unilateral data binding: <input type="text" :value="singleKeyword"
      /></label>
      <label
        >Bidirectional data binding: <input type="text" v-model="bidirectional"
      /></label>
    </div>

    <!-- v-pre:跳过该元素及其所有子元素的编译.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。 -->
    <div v-pre>{{the Dom will not be compiled}}</div>

    <!-- v-once:所在节点在初次动态渲染后，就视为静态内容了。以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。 -->
    <div v-once>num value is {{ num }}</div>
    <button @click="addnumber">change num</button>

    <!-- :class添加动态样式。
      class可以写多个样式名。如果其中有动态样式，则使用:和三元运算。注意动态样式要用&.classNameTwo{}
     -->
    <div :class="['list-item', active ? 'disabled' : '']">active class</div>
    <div class="list" :class="{ listchild: active }">active class two</div>

    <!--非class设置动态样式。&:设置的样式，可以不用class直接写样式名。  -->
    <button class="classButton"
    :disabled="active"
    >&lt;</button>
  </div>
</template>

<script  setup>
import { reactive, toRefs } from "@vue/reactivity";

let data = reactive({
  messageText: "<div>v-text expects data of string type</div>",
  messageTextTest: "whether data will be overwritten",
  messageHtml:
    "<div style='color:red'>v-html update the innerHTML of the DOM element</div>",
  name: "Tom",
  fruits: [
    { id: "001", name: "apple" },
    { id: "002", name: "orange" },
    { id: "003", name: "banana" },
  ],
  car: {
    name: "BYD",
    color: "black",
    price: "12w",
  },
  persons: [
    { id: "001", name: "张三", age: 18 },
    { id: "002", name: "李四", age: 19 },
    { id: "003", name: "王五", age: 20 },
  ],
  singleKeyword: " unilateral data",
  bidirectional: " bidirectional data",
  browser: "https://www.baidu.com",
  foods: ["rice", "noodies", "potato"],
  num: 1,
  active: true,
});

let {
  messageText,
  messageTextTest,
  messageHtml,
  name,
  fruits,
  car,
  persons,
  singleKeyword,
  bidirectional,
  foods,
  num,
  active,
} = toRefs(data);

function addPerson() {
  data.persons.unshift({
    id: "004",
    name: "老刘",
    age: 40,
  });
}

function showInfo(event) {
  console.log("entry message is:", event.target.value);
  console.log(
    "the name of the keyboard is: ",
    event.key,
    "the code of the keyboard is: ",
    event.keyCode
  );
}

function showInfoOther(num) {
  console.log("The params is:", num);
}

function showmessage() {
  alert("hello, please study hard!");
}

function addnumber() {
  data.num++;
}
</script>

<style lang='less' >
.list-item {
  height: 30px;
  width: 100px;
  background-color: #ddd;

  &.disabled {
    color: red;
  }
}

// .disabled {
//   color: red;
// }
.list {
  height: 30px;
  width: 150px;
  background-color: #ddd;

  // &.listchild {
  //   color: red;
  // }
}

.listchild {
  color: red;
}

.classButton {
  border: none;
  outline: none;
  width: 38px;
  height: 38px;
  background-color: gray;
  color: #fff;
  border-radius: 5px;
  // 设置按钮的隐藏样式
  &:disabled {
    opacity: 0.6;
  }
}
</style>
