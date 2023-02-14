<template>
  <section class="frame">
    <header class="head">
      <div class="title">
        <h4 class="title_main">{{ title_Main }}</h4>
        <h4 class="title_sub">{{ title_Sub }}</h4>
      </div>
      <ul class="menu">
        <li
          class="menuTab"
          :class="{ current: tab_current === item.id }"
          v-for="item in menuList"
          :key="item.id"
          @click="handlerCurrent(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </header>

    <div class="content-wrap">
      <div class="check-list">
        <label>其他选项:</label>
        <span
          class="active"
          :class="{ current: item.active }"
          v-for="item in option"
          :key="item.id"
          @click="handlerOptionClick(item)"
          >{{ item.value }}</span
        >
      </div>
      <div class="main-wrap">
        <div class="render-wrap">内容区</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "@vue/reactivity";

const props = defineProps<{
  titleMain: string;
  titleSub: string;
  petList: object[];
  options: object[];
}>();

type dataType = {
    title_Main:string,
    title_Sub:string,
    menuList:object[],
    option:object[],
    tab_current:string,
    option_current:string
}


// 官方不建议直接使用props数据
const data:dataType = reactive({
  title_Main: props.titleMain,
  title_Sub: props.titleSub,
  menuList: props.petList,
  option: props.options,
  tab_current: "001",
  option_current: "001",
});

const { title_Main, title_Sub, menuList, tab_current, option, option_current } =
  toRefs(data);

type optionType = {
    id:string,
    value:string,
    active:boolean
}

const emit = defineEmits<{
  (e: "clickHandler", parmas: object): void;
  (e: "handlerOptions", params: optionType): void;
}>();

const handlerCurrent = (params) => {
  data.tab_current = params.id;
  emit("clickHandler", params);

  // 判断对象中是否有回调函数
  //   if (
  //     params.callback &&
  //     Object.prototype.toString.call(params.callback) === "[object Function]"
  //   ) {
  //     params.callback(params);
  //   }
};

const menuMethod = (params) => {
  console.log(params);
  console.log("aaa");
};

const handlerOptionClick = (params:optionType) => {
  params.active = !params.active;
//   判断是否点击全部，若是则取消其他按钮的高光
    if(params.id === "001"){
        data.option.forEach(element => {
            (element as any).active = false
        });
        params.active = true
    }
  data.option_current = params.id;
  emit("handlerOptions", params);
};
</script>

<style lang="less" scoped>
.frame {
  width: 465px;
  height: 360px;
  border: 1px solid rgb(197, 196, 196);
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;

  .head {
    width: 420px;
    height: 60px;
    border-bottom: 1px solid rgb(197, 196, 196);
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;

    .title {
      width: 100px;
      height: 50px;
      display: flex;
      justify-content: space-between;

      .title_main {
        width: 40px;
        height: 20px;
        font-size: small;
      }

      .title_sub {
        width: 40px;
        height: 20px;
        font-size: small;
      }
    }

    .menu {
      width: 250px;
      height: 50px;
      margin: 0px 5px;
      display: flex;
      justify-content: space-around;

      .menuTab {
        width: 40px;
        height: 20px;
        margin: 16px 3px;
        border: 1px solid gray;
        border-radius: 5px;
        font-size: small;
        font-weight: bold;
        list-style: none;
        text-align: center;
      }

      .current {
        background-color: rgb(206, 205, 205);
      }
    }
  }

  .content-wrap {
    width: 420px;
    height: 300px;
    display: flex;
    flex-wrap: wrap;

    .check-list {
      width: 230px;
      height: 40px;
      display: flex;
      justify-content: space-around;

      & > label {
        width: 60px;
        height: 20px;
        margin-top: 5px;
        font-size: small;
        font-weight: bold;
        line-height: 20px;
      }

      & > span {
        width: 40px;
        height: 20px;
        margin-top: 5px;
        border: 1px solid rgb(255, 255, 255);
        border-radius: 10px;
        font-size: small;
        line-height: 20px;
        text-align: center;
      }

      .current {
        background-color: rgb(171, 195, 238);
      }
    }

    .main-wrap {
      width: 420px;
      height: 220px;

      .render-wrap {
        line-height: 220px;
        text-align: center;
        background-color: rgb(187, 185, 185);
      }
    }
  }
}
</style>