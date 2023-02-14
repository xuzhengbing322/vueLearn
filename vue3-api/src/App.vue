<template>
  <h1>{{ count }}</h1>
  <Test :title="title" :count="count" @plusHandler="plus" />
  <h2>{{ name }}今年{{ age }}</h2>

  <span>{{ text }}</span>
  <input type="text" v-model="text" />

  <h1 ref="myRef">{{ count }}</h1>

  <Father :title="title" ref="father" />
  <button @click="changeName">改变</button>

  <div ref="child">张三</div>
  <button @click="changeNameRef">改变名字</button>

  <button @click="changeFather">改变父亲名称</button>

  <div>
    <my-button btnStyle="btn-danger">我的按钮</my-button>
    <my-input placeholderText="我的输入框" />
  </div>

  <TabNav />
</template>

<script>
/**Vue3.0将核心源码分成一个又一个独立的包，包中有一个又一个的函数，这些函数实现了固定的功能。通过这些函数
来解决开发中的各种问题。也就是说，Vue3.0框架由各个包中的函数组合而成。因此，我们将各个功能函数称之为
Composition API 组合API。前端的API要么是个函数，要么是个构造函数。
  * Vue3.0的源码 vue-next

  * 1、Composition API 和 options API
  * API：Application Programming Interface 应用程序接口
  * Vue组件默认导出一个对象，对象的属性是options API，框架内置的各种options API可以完成各种功能。
Vue2.0完全采用options API来横向的拆分组件。这种方式的缺点是内聚性弱，数据比较分散。
Vue3.0为了解决内聚性弱的问题，采用options API和Composition API来拆分组件。Composition API基于
函数，因为函数具有较好的封装性。setup是options API，组件的逻辑都写在setup函数体中，setup函数也是
在组件中使用Composition API的程序入口。
  * Vue将实现各种功能的Composition API都封装到vue中，每个功能函数都是一个hook。当需要使用这些
Composition API来完成业务需求时，只需从vue中解构出来使用即可。
  * Vue3.0中的options API：name: xxx, props: {}, components:{}, directives: {},setup () {}
  * Composition API最大的好处就是能让程序的封装性和代码的复用性更强。
  
 
  2、setup() {}
  * setup函数是在组件使用 Composition API 的程序入口。
  * setup调用时机：当组件实例对象被创建并且属性的初始化完成以后，到beforeCreate勾子之前，setup才会调用。
  * setup函数中的数据在template中使用：setup(){}声明的数据会以对象的形式return，对象中的属性（数据）
会被合并到render函数的执行期上下文。render函数会渲染template，因此，template就可以使用render函数的
执行上下文中的属性，也就可以使用setup返回的数据了。因此，setup里面声明的数据和方法return出去后才能
在template中使用。
  *RefImpl对象只有value属性。setup函数在return RefImpl数据时，会自动拆解RefImpl。因此，在template
中访问RefImpl.value属性值时，并不需要.value，而是直接RefImpl数据对象名即可调用它的value值。
  * setup函数中使用render函数：在Vue3.0中，可以不通过<template>，而是通过render函数在页面中渲染数据。
vue中的h函数就是render函数。setup函数return一个h/render函数。render函数的参数1是页面DOM节点标签，
参数2是DOM节点内容。最终render函数会在页面中渲染DOM节点标签和内容。
  * 响应式数据和静态数据的区别：静态数据只在template中渲染一次，从此不再改变。响应式数据渲染在template
后，数据一旦发生变化就会再次渲染template。
  * 在template中使用的数据，除了props对象属性以外，就是setup返回的对象属性。
  * arguments[0]：props本身是选项API，属性值为对象。setup函数参数1接收proxy代理过的props对象。
watch/watchEffect可以观测到props的变化。注意，1、不要在setup函数的参数1处解构props对象，也不要在
setup函数体中解构props，这都会让解构的数据丧失响应式。2、setup函数参数1接收的props只可读，不可在
子组件的setup函数体中直接更改props对象。要想修改props中的数据，要么在父组件修改props数据，要么子组件
发送事件修改父组件中的相应的数据。  这个的作用就是为了能在setup函数中调用props选项API中的数据。
  * argument[1]：setup函数参数2是context对象，它是setup函数运行时的执行期上下文。context对象
包含attrs、slots、emit属性。attrs和slots都是在当前组件实例中，代理后的相对应的值。它们总是暴露最新
的值。
    父组件传递数据给子组件，但子组件并没有使用props选项API接收数据，则attrs包含当前组件实例对象的props
中的属性。反之，attrs就不包含这些属性。attrs不常用。
    子组件传递数据给父组件：emit。子组件通过emits选项创建自定义事件，然后通常在点击事件中通过
emit('自定义事件名称', 数据）调用父组件中的子组件标签中的自定义事件。触发自定义事件后就会调用它所绑定的
事件处理函数。事件处理函数的参数就是数据，即子组件传递过来的数据。从而实现子组件传递数据给父组件。
context.emit()的参数1是自定义事件名称，参数2是要传递的数据。
    将props单独设置为参数，而非设置在context对象中的原因：1、props比其他属性使用的更频繁，而且大多数
 情况下组件只使用props。2、更方便的给props对象中的属性设置类型推断
 * this的使用：setup函数中不能使用this。因为setup是在声明周期之前调用。如果想在setup函数中获取类型引用，
 可以使用defineComponent，也就是说在setup外面包一层defineComponent就可以了。
  

 3、Reactivity APIs
 3.1、Basic Reactivity APIs
 * reactive()：用proxy包装对象，将对象变成被代理后的响应式对象。reactive()和Vue2.0中的
Vue.observable()功能相同。只不过Vue.observable()使用Object.defineProperty()实现代理，
reactive()是使用proxy实现代理。   reactive是深度响应式转换，它会影响所有嵌套的属性。reactive()返回的
响应式对象和原对象不相等，响应式独立工作，避免依赖原对象。也就是说，建议程序员不要用原对象，而是使用
响应式对象。 

 * ref()：ref()函数会返回一个响应式的并且可变的ref对象（RefImpl），对象中只有一个value属性。
通过refObj.value就能访问value值。如果将对象作为value值，则使用reactive()将这个对象转换为深度的
响应式数据。因此，开发中如果是单个数据可以使用ref()，如果是多个数据使用reactive()更好。
RefImpl: reference implement 引用执行 
    在template中如何访问ref数据。当一个ref数据对象，在render作用域中被作为一个属性返回。（setup
函数返回的对象中的属性会合并到render函数的执行上下文中，以便template能使用这些属性。）它会自动
的展开，在template中就可以直接通过refObj就能访问数据，不用refObj.value访问数据。
    在Rective Objects中如何访问ref数据。当一个ref数据对象作为一个reactive({})对象中的属性被访问
和被改变，数据对象会自动展开。因此，正常的访问ref数据对象名就能访问到ref数据对象中的value值。
    注意：如果将一个新的ref数据赋值给一个已经存在的ref，那新的ref就会覆盖老的ref。
    注意：在reactive()的参数是[ref(x)]，即ref数据对象在数组或原生集合类型(Map)中，那么ref数据对象
 中的value属性不会自动展开。
    注意：ref数据对象在setup函数的作用域中使用时，需要.value来使用。
 
 3.2、Refs
 * unref()：如果实参是ref数据对象，则返回ref数据对象的value属性值。除此以外，返回实参本身。
 * 
 * 
 * isRef()：检查值是否为RefImpl，ref数据对象。
 

  8、reactive与readonly周边API
  * isProxy()：检查对象是否由reactive和readonly创造的proxy代理对象。使用原生的Proxy构建出来的对象
  ，isProxy()返回的还是false。
  * isReactive()：检查对象是否由reactive创造的proxy代理对象。如果对象即被reactive包裹，又被readonly
  包裹，那isReactive()和isReadonly()检查这个对象返回的都是true
  * isReadonly() 检查对象是否由readonly创造的proxy代理对象。
  * shallowReactive()：reactive()其实是deepReactive()，默认是深度的。创造一个proxy代理的响应式
  对象，但是它不会对嵌套的对象运行深度的响应式转换，嵌套的对象就是普通值。也就是说，shallowReactive()
  只将对象的第一层转化为响应式数据。
  * shallowReadonly()：创造一个proxy代理的响应式对象，让它的属性成为只读属性。但是它不会对嵌套的对象
  运行深度的响应式转换，嵌套的对象就是普通值。
  * toRaw()：raw意思是普通的对象，而非代理的对象。toRaw()就是把对象转换成非代理的对象。它几乎不使用，
  只是它有助于让程序员思考响应式系统是怎么工作的。toRaw()将响应式或只读代理对象转换成一个普通对象。
  toRaw()返回的对象和源普通对象完全相等。
  * markRaw()：标记一个对象，标记对象不会被转化成proxy对象。markRaw()返回的对象和源对象完全相等。
  当给标记对象包装reactive()时，对象会跳过响应式封装，返回普通对象。将标记对象封装成响应式对象的属性
  这个对象依然是普通对象。
    markRaw和shallowxxx允许你可以选择不参与默认的深度reactve/readonly转换。这都是为了用于这下面
  的几种情况。1、一些简单的数据不应该被作为响应式数据。例如，复杂的第三方类实例、Vue组件对象。
  2、skipping跳过proxy的转换能在渲染庞大的不可变的数据列表时提高性能。
    这些不需要转化为响应式的数据应该都是比较根部的数据。
    如果普通对象在不被标记，而直接作为属性存储到另一个对象中。 当外层对象变为响应式数据时，这个普通对象
  也会跟着变为响应式数据。markRaw()不能包装对象嵌套的对象，非深度的。

  9、生命周期
  * 生命周期勾子以onX函数的形式注册。这些生命周期勾子注册函数只能用在setup(){}中同步使用。因为它们都是
  依赖内部的全局状态去定位到当前激活的组件实例（setup执行的时候，当下组件的实例）。getCurrentInstance()
  可以获取当前组件的实例，函数返回的对象就是当前的实例。 在不是当前活跃实例的情况下调用生命周期，会导致错误。
  也就是说，只能在setup(){}中执行
    在这些生命周期勾子同步执行的时候，组件实例的执行期上下文也会被设置。也就是说，生命周期执行的时候组件实例
  的上下文就已经存在。与此同时，生命周期勾子中的侦听器和计算属性也会被同步的创建。当组件被卸载的时候，在
  生命周期中同步创建的侦听器和计算属性也会被卸载掉。
  
  * onErrorCaptured()：子孙组件的错误，父组件可以通过这个方法获取到这些错误。
  * onRenderTracked()：追踪render的行为。在函数体中写debugger，可以追踪render走的每一步。
  * onRenderTriggered()：追踪render触发时候的行为。在函数体中写debugger，可以追踪render重新渲染
  的时候，走的每一步。
  * Vue2.0写在beforeCreate和created中的代码都直接写在Vue3.0中的setup中。
  * 生命周期勾子执行的时候，生命周期勾子中的回调函数就会执行
  
  10、Provide/inject
  * 当组件结构嵌套的比较深，使用props和emit方法沿着组件链逐级传递数据很麻烦。使用provide/inject能
  更好的实现父组件跨级传递数据给子组件。
    父组件通过provide()参数1是数据名称、参数2是值，将数据暴露给所有的子组件。任意子组件都可以通过
  inject()参数1是数据名称、参数2是数据默认值，来接收数据。inject()返回值就是接收的数据。provide()一次只能
  提供一个数据，inject()一次也只能接收一个数据。父组件不知道谁用了它提供的数据，子组件也不知道注入的数据
  是谁提供的。
    如果provide()提供的数据是普通数据，则inject()返回的数据也是普通数据。如果provide()提供的是
  响应式数据，则inject()返回的就是响应式数据。建议provide()提供的属性用readonly，以保证提供的数据
  不会被子组件修改。在父组件中改变数据比较符合逻辑。如果想在子组件中改变数据，建议在父组件中提供更改的
  方法，然后子组件接收并调用这个方法。
  
  11、refs
  * 尽管props(属性)和events(事件)存在，但有时候在javascript中，可能你还是需要访问到子组件。为了完成
  这个任务，你可以用ref属性来给子组件或者HTML元素指定一个引用ID。通过引用ID就可以拿到子组件的实例或者
  HTML元素。 从而调用实例中的属性和方法。ref放在组件中，就是拿组件的实例。ref放在HTML元素中，就是拿
  HTML元素。
  *$refs只是对直接操作子组件的应急方法。你应该避免在template或者computed中使用$refs。

  * 当用响应式API时，响应式ref和模版ref的概念时统一的。为了保持在template的HTML元素或组件实例中保持
  统一的引用。我们可以声明一个普通的ref，然后在setup中导出去。

  12、Application Config
  * config是一个对象，这个对象包含Vue App的全局配置。在将App实例对象app挂载到节点之前，你可以调整它的
  属性列表。app.config对象中包含errorHandler
  * errorHandler：设置一个捕获器捕获在组件渲染和侦听器期间未捕获的错误。反映出来的错误会在errorHandler
  调用的时候输出出来。
  * warnHandler：设置一个警告捕获器捕获Vue运行是的警告。
  * globalProperties：添加一个全局属性，全局属性可以在app组件实例当中任何的子组件实例都可以被访问到
  如果组件内部有相同名称的属性，那就优先使用组件内部的属性。
  * optionMergeStrategies()：定义一个选项API。
  * app.config.performance()：
  
  13、Application API
  * createApp()：在Vue3.0中，能够转换全局的API都移到了被createApp()创造出来的app的实例中。调用createApp()会返回
  app的实例对象。实例会提供app的执行期上下文呢。整个组件树被app实例所挂载，组件树都共享相同的执行期上下文
    除此之外，因为createApp返回app组件实例。所以你可以在它之后关联其他的一些方法。
  * app.component()：定义组件。参数1是组件名称，参数2是组件。如果第二个参数没传的话，那它返回undefined。
  如果第二个参数传了的话，那它就会返回app应用的实例。
  * app.config()：
  * app.mount()：将根组件的app实例对象挂载到提供的DOM节点元素中。
  * app.unmount()：将根组件的app实例对象从提供的DOM节点元素上卸载下来。
  * app.directive()：Vue中有一些内置的指令，如v-for、v-if。它们的底层就是js逻辑。通过它们可以更方便
  的操作视图。常用于将视图上的一些逻辑给抽离成指令，然后把指令挂载到元素中。
  * app.use(p1, p2)：使用第三方插件。参数1是要使用的插件名。参数2是options，具体要使用的标签，以便按需
  注册。

  
 
 
 
 
 
 
 
 
     
 

 **/
import {
  reactive,
  ref,
  toRefs,
  h,
  isRef,
  unref,
  toRef,
  customRef,
  shallowRef,
  watchEffect,
  triggerRef,
  computed,
  readonly,
  onBeforeUpdate,
  onMounted,
  watch,
  isProxy,
  markRaw,
  getCurrentInstance,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  provide,
} from "vue";
import Test from "@/components/Test.vue";
import Father from "@/components/Father.vue";
import MyButton from "./libs/MyUI/MyButton.vue";
import MyInput from "./libs/MyUI/MyInput.vue";
import TabNav from "@/components/TabNav.vue";

// 写一个自己的Composition API。实现防抖操作。
function useDebouncedRef(value, delay = 200) {
  // 计时器
  let timeout = null;

  // customRef()参数是工厂函数。track是追踪依赖，get方法中需要执行track()。trigger是触发更新，set方法中需要执行trigger()
  return customRef((track, trigger) => {
    return {
      get() {
        // 获取的时候要追踪依赖
        track();
        return value;
      },
      /*text绑定了input，当向input输入数据时，就会启动计时器。但当delay时间间隔内再次输入数据时，就会
      再次执行set()，就会消除上一个计时器，重新设置一个计时器。delay时间过后，再进行赋值，从而实现防抖。
      */
      set(newValue) {
        // 清除计时器
        clearTimeout(timeout);
        // 设置计时器，延迟更新value
        timeout = setTimeout(() => {
          value = newValue;
          // 数据更新后就要触发trigger()
          trigger();
        }, delay);
      },
    };
  });
}

export default {
  name: "App",
  components: {
    Test,
    Father,
    MyButton,
    MyInput,
    TabNav,
  },
  setup(props, { attrs, emit, slots }) {
    const count = ref(0);
    const title = ref("我是vue");
    const state = reactive({
      count,
      // 框架自动实现：count: count.value
    });
    const otherCount = ref(2);
    const arr = reactive([ref(5)]);
    const map = reactive(new Map([["foo", ref(6)]]));
    // const foo = ref<string | number>('foo)

    // 1、render
    // return () => h('h1', [count.value])

    console.log(state.count); //0
    state.count = 1;
    console.log(state.count); //1
    state.count = otherCount;
    console.log(state.count); //2
    console.log(count.value); //1
    console.log(arr[0].value); //5
    console.log(map.get("foo").value); //6
    // const { attrs, emit, slots} = context

    // setTimeout( () => {
    //   title.value = '我是vue3.0'
    // }, 2000);

    const plus = (num) => {
      count.value += num;
    };

    // unref
    const info = ref({
      name: "张三",
      age: 18,
    });
    // const objUnref = isRef(info) ? info.value : info
    const objUnref = unref(info);
    console.log("objUnref", objUnref); //proxy{}

    /*3.1、toRef()
toRef()：可以将源响应式对象中的某个属性作为ref()的参数，创造出一个新的RefImpl。这个RefImpl和
源对象属性保持着响应式的连接。也就是说，RefImpl的value属性 和 源对象对应的属性，一方发生变化，另一方
也会跟着发生变化。应用场景：把响应式数据对象中的单独属性拿出来ref一下。
*/
    const infoToRef = reactive({
      name: "张三",
      age: 18,
    });

    const objToRef = toRef(infoToRef, "name");
    objToRef.value = "李四";
    console.log("infoToRef", infoToRef.name);
    infoToRef.name = "王五";
    console.log("objToRef", objToRef.value);

    /*3.1、toRefs
  toRefs()：转化一个响应式对象成一个普通的对象，普通对象中的每个属性都是一个RefImpl，即每个属性都经过
ref()的转化。因此，在return对象中...toRefs转换后的对象，就相当于返回多个refImpl。这样template中就
不用在写响应式对象名.属性名，而是直接写属性名就可使用数据。
*/
    const infoToRefs = reactive({
      name: "张三",
      age: 18,
    });

    const stateRefs = toRefs(infoToRefs);
    console.log("stateRefs", stateRefs);
    console.log("stateRefs", stateRefs.name.value);

    /*3.1、customRef()
 customRef：使用清楚明了的控制，创建一个自定义的ref，依赖追踪和更新触发。customRef的参数是工厂函数
工厂函数的参数是track()和trigger()，获取值时调用track()追踪依赖，更新值时调用trigger()，并且返回一个
有get()和set()的对象。customRef实现防抖、节流、图片懒加载。

*/
    //使用自定义API
    const text = useDebouncedRef("", 1000);

    /*3.2、shallowRef()和triggerRef()
 * shallowRef()：创建一个ref(RefImpl)，并追踪自己的.value的变化。当给RefImpl.value赋值新对象后，
RefImpl.value将不再是响应式对象，而是普通对象。 
 如果是ref()创建的RefImpl，那给RefImpl.value赋值新对象后，RefImpl.value依旧是响应式对象，只不过是
Proxy代理的响应式对象。
 watchEffect()追踪(检测)不到shallowRef()的RefImpl中属性的值
 * triggerRef()：手动的触发一次shallowRef()的RefImpl，以便它的属性更改能被检测到。
*/
    // shallowRef()、triggerRef()：
    const infoSATRef = shallowRef({
      name: "张三",
    });
    console.log("infoSATRef", infoSATRef); //RefImpl

    infoSATRef.value = {
      name: "李四",
    };
    console.log("infoSATRef", infoSATRef.value); //object

    const infoSRef = shallowRef({
      name: "徐",
    });

    let name = "";
    watchEffect(() => {
      name = infoSRef.value.name;
      console.log(name);
    });

    infoSRef.value.name = "毛";

    triggerRef(infoSRef);

    /*4、computed()
 computed()：Vue2.0中computed是选项，Vue3.0中computed是API。computed返回值是RefImpl。
computed()设置了一个getter函数，并返回一个不可变得RefImpl。当调用computed()的计算属性时，执行参数
函数，返回函数的返回值。 如果只需要设置get函数，则computed()的参数可以简写为get函数。computed()的
参数也可以是对象，对象中包含get和set函数，去创建一个可写的RefImpl。
*/
    const sentence = ref(", 您好，欢迎来到Vue3.0");
    const superSentence = computed(() => {
      return "小明" + sentence.value;
    });

    console.log("superSentence", superSentence.value);

    const superOtherSentence = computed({
      get() {
        return "小明" + sentence.value;
      },
      set: (newValue) => {
        console.log("我修改sentence的值");
      },
    });

    console.log("superOtherSentence", superOtherSentence.value);
    superOtherSentence.value = "1";

    /* 5、readonly()
   readonly()：获取一个对象（响应式或者普通）或者是一个RefImpl作为参数，它会返回一个只读的由proxy代理
的原对象。返回的对象是深度的，任何一层嵌套的属性都是只读的。
*/
    const reactiveObj = reactive({
      a: 1,
      b: {
        c: 2,
      },
    });

    const newReactiveObj = readonly(reactiveObj);
    newReactiveObj.a = 4;
    console.log(newReactiveObj.a);

    /*6、watchEffect()
 * watchEffect()的参数函数是立即执行函数，并在组件加载完毕后立即执行。watchEffect()自动收集参数函数中
使用到的数据，这些数据就是依赖。watchEffect()会响应式的追踪依赖(监听的数据)。当监听的数据发生变化时，
watchEffect()会再次执行，即参数函数也会再次执行。在组件卸载的时候，watchEffect()会自动停止。
    watchEffect()的返回值是一个停止函数，执行这个停止函数，就可以停止watchEffect()。

 * 副作用失效：副作用函数包括请求函数、请求数据、ajax请求、操作localStorage、setTimeOut。
    当watchEffect()的参数函数中有异步副作用，并且需要在异步操作失效的时候清除异步副作用。参数函数的参数
 是onInvalidate函数。onInvalidate函数的参数是失效函数。失效函数的作用就是使watchEffect()的参数
 函数中的副作用失效。失效函数在副作用即将重新执行之前执行。因为，如果watchEffect()参数回调函数是异步函数，
 那失效函数就无法使副作用失效。onInvalidate函数可以很好的实现防抖操作。 失效函数也会侦听器停止或组件卸载
 的时候执行。
    我们注册失效回调函数onInvalidate()为什么不在watchEffect()中return一个函数，而是传入onInvalidate
 做为参数，然后在onInvalidate的参数回调函数中处理失效的副作用。因为返回值对于异步函数的错误处理非常重要。
  * 副作用刷新的时机：当同一次刷新中有许多数据发生变化的时候，Vue响应系统会缓存失效的副作用，并且会异步
  的刷新它们，避免重复的调用。在组件内部的update函数也被当作被监听的副作用。当用户定义的副作用已经进入
  执行队列，它默认会在所有组件更新副作用之前调用。依旧是说，watchEffect()会在声明周期等函数调用。
  * watchEffect()会在初始运行的时候，同步运行。当监视的数据改变时，watchEffect()的回调函数会在组件
  更新之前调用。
  * watchEffect()可以追加额外的选项，对象中有flush选项。flush选项的值默认为'pre'。flush选项的值
  为'post'时，watchEffect()会在所有组件更新副作用之前调用。
  * 注意，watchEffect()第一次运行是在onMounted()之前运行。因此如果你想在副作用中操作DOM或者模版的
  refs的话，你必须放到mounted()中
  * watchEffect()参数还可以是{onTrack(e){}, onTrigger(e){}}。onTrack()在响应式数据第一次被监听
  到以及数据更新时都会执行。onTrigger()在依赖数据有变化的时候再执行。onTrack()和onTrigger()都会接收
  event对象，event中包含依赖所有的信息。推荐在其中添加debugger来调试检查依赖数据。
  onTrack()和onTrigger()只会在开发模式中使用

  * pre watchEffect()在onBeforeMount等生命周期勾子之前运行，post watchEffect()
  在onBeforeUpdate之后，onUpdated之前运行。

*/
    // watchEffect()
    const num = ref(0);

    setTimeout(() => {
      num.value = 1;
    }, 1000);

    setTimeout(() => {
      num.value = 2;
    }, 3000);

    // 在watchEffect()执行之后执行 pre
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });

    // watchEffect()第一次先执行，在执行onMounted
    onMounted(() => {
      console.log("onMounted");
    });

    watchEffect(
      () => {
        console.log("&&", num.value);
      },
      {
        flush: "post",
      }
    );

    const stop = watchEffect(async (onInvalidate) => {
      //effect function 参数函数
      //const data  = await getData() //effect 副作用
      console.log(num.value);

      onInvalidate(() => {
        console.log("onInvalidate is triggered");
      });
    });

    // setTimeout(() => {
    //   stop();
    //   console.log('WatchEffect is stopped');
    // }, 2000)

    const myRef = ref(1);

    // 先输出1，组件更新后输出h1标签，因为watchEffect()在onMounted之前执行。如果想直接拿到h1，则在onMounted里面执行。
    watchEffect(() => {
      console.log(myRef.value);
    });

    // watch()
    const numWatch = ref(1);
    const nameWatch = ref("张三");

    setTimeout(() => {
      numWatch.value = 8;
    }, 2000);

    setTimeout(() => {
      nameWatch.value = "李四";
    }, 2000);

    /*
    ref:
    () => {
      return numWatch.value
    }  ==> numWatch

    reactive:
    () => {
      return state.count
    }  ==> () => state.count
    */

    /* 7、watch
  * watch()需要观察一个明确的数据源，并且在另一个独立的回调函数中执行副作用。也就是说，watch()的参数1
是数据源，参数2是数据源改变时需要执行的函数。当数据源发生改变，参数2就会执行。参数2函数的参数是
newValue和oldValue，即改变前和改变后的值。
  * 如果watch()只监测一个数据，则可以将参数1函数省略为数据名，注意ref数据和reactive数据并不相同。
如果watch()要监测多个数据，则不能简写，数据以数组的形式书写。
  * onBeforeUpdate()在watch()之后运行。{flush:xx, onTrack() {} , onTrigger() {} }和
  watchEffect()类似。onInvalidate是在参数2的第三个参数。
  * watch()也会返回一个stop()函数
  
  */
    watch(
      () => {
        return numWatch.value;
      },
      (newValue, oldValue) => {
        console.log(
          `数据源被改变了，新数据是：${newValue}，旧数据是：${oldValue}`
        );
      }
    );

    watch(
      () => {
        return [numWatch.value, nameWatch.value];
      },
      ([newNum, newName], [oldNum, oldName]) => {
        console.log(
          `$新数据是${newNum},${newName},旧数据是${oldNum},${oldName}`
        );
      }
    );

    // isProxy()
    const stateProxy = reactive({
      name: "张三",
    });

    console.log(isProxy(stateProxy)); //true

    // markRaw
    const objRaws = {
      a: 1,
      b: 2,
      more: {
        c: 3,
        d: 4,
      },
    };

    const rawObj = markRaw(objRaws);

    const proxyObj = reactive({
      nested: rawObj.more,
    });

    console.log("&&%%", proxyObj.nested === rawObj.more); //false

    // 生命周期
    const instance = getCurrentInstance();
    console.log(instance);

    onErrorCaptured((e) => {
      console.log(e);
    });

    // onRenderTracked((e) => {
    //   debugger
    // })

    // onRenderTriggered((e) => {
    //   debugger
    // })

    // provide/inject

    const hobby = ref("travel");
    provide("hobby", readonly(hobby));

    const changeName = () => {
      hobby.value = "李四";
    };

    provide("changeName", changeName);

    // refs
    const child = ref(null); //html element的初始值一般都是null。
    const changeNameRef = () => {
      //console.log(child.value)
      child.value.innerText = "李四";
    };
    const father = ref(null);

    const changeFather = () => {
      father.value.changeNameRefs;
    };

    return {
      title,
      count,
      plus,
      ...stateRefs,
      text,
      myRef,
      child,
      changeNameRef,
      father,
      changeFather,
    };
  },
};
</script>

<style>
.item-btn.active {
  background-color: green;
  color: azure;
}
</style>
