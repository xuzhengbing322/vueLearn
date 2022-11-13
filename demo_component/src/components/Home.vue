<template>
  <div class="frame">
    <Children
      :titleMain="titleMainOne"
      :titleSub="titleSubOne"
      :petList="dogList"
      :options="dogOption"
      @clickHandler="getMessage"
      @handlerOptions="getOptionMessage"
    />
    <Children
      :titleMain="titleMainTwo"
      :titleSub="titleSubTwo"
      :petList="catList"
      :options="dogOption"
      @clickHandler="getMessage"
      @handlerOptions="getOptionMessage"
    />
    <Children
      :titleMain="titleMainThree"
      :titleSub="titleSubThree"
      :petList="bearList"
      :options="bearOption"
      @clickHandler="getMessage"
      @handlerOptions="getOptionMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "@vue/reactivity";
import Children from "./Children.vue";

const Pet = reactive({
  titleMainOne: "Dog",
  titleSubOne: "Huskie",
  titleMainTwo: "Cat",
  titleSubTwo: "Ragdoll",
  titleMainThree: "Bear",
  titleSubThree: "Panda",
  catList: [
    { id: "001", value: "橘猫" },
    { id: "002", value: "布偶" },
    { id: "003", value: "英短" },
    { id: "004", value: "野猫" },
  ],
  dogList: [
    { id: "001", value: "大黄" },
    { id: "002", value: "哈士奇" },
    { id: "003", value: "土狗" },
    { id: "004", value: "萨摩耶" },
  ],
  bearList: [
    { id: "001", value: "小熊猫" },
    { id: "002", value: "大熊猫" },
    { id: "003", value: "灰熊" },
    { id: "004", value: "棕熊" },
  ],
  dogOption: [
    { id: "001", value: "全部", active: true },
    { id: "002", value: "年龄", active: true },
    { id: "003", value: "价格", active: true },
  ],
  bearOption: [
    { id: "001", value: "全部", active: true },
    { id: "002", value: "年龄", active: true },
    { id: "003", value: "价格", active: true },
    { id: "004", value: "体重", active: true },
  ],
});
let {
  titleMainOne,
  titleSubOne,
  titleMainTwo,
  titleSubTwo,
  titleMainThree,
  titleSubThree,
  catList,
  dogList,
  bearList,
  dogOption,
  bearOption,
} = toRefs(Pet);

const getMessage = (params) => {
  console.log("@@", params);
};

const getOptionMessage = (params) => {
  console.log("option", params);
};
</script>

<style lang="less" scoped>
.frame {
  display: flex;
  justify-content: space-around;
}
</style>