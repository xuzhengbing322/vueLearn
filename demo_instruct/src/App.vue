<template>
  <div id="item">
    <div
      id="phone"
      :class="{ active: item.isActive }"
      v-for="item in menu"
      :key="item.id"
      @click="changeCurrent(item), changeIsActive(item), changeCommodity(item)"
    >
      {{ item.name }}
    </div>
  </div>
  <div id="waves">
    <figure v-for="item in list" :key="item.id">
      <span
        v-if="item.type"
        :style="{ 'background-color': flag[item.type].color }"
        >{{ flag[item.type].evaluate }}</span
      >
      <img :src="item.src" alt="" />
      <figcaption>price:{{ item.price }}</figcaption>
    </figure>
  </div>
  <!-- <div id="mountain">
    <img src="../static/images/mountainone.jpeg" alt="" />
    <img src="../static/images/mountaintwo.jpeg" alt="" />
    <img src="../static/images/mountainthree.jpeg" alt="" />
  </div>
  <div id="flower">
    <img src="../static/images/flowerone.jpeg" alt="" />
    <img src="../static/images/flowertwo.jpeg" alt="" />
    <img src="../static/images/flowerthree.jpeg" alt="" />
  </div> -->
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "@vue/reactivity";

const data = reactive({
  // 导航栏
  menu: [
    { name: "photo", id: "001", isActive: true, value: "photoStore" },
    { name: "computer", id: "002", isActive: false,value:"computer" },
    { name: "headset", id: "003", isActive: false,value:"headset" },
  ],
  //当前导航栏序号
  current: "001",
  //   商品信息
  list: [],
  //图片小标数据
  flag: {
    1: {
      evaluate: "best",
      color: "red",
    },
    2: {
      evaluate: "btter",
      color: "blue",
    },
    3: {
      evaluate: "nomal",
      color: "green",
    },
  },
  photoStore: [
    {
      id: "01",
      price: 1000,
      src: "https://img.alicdn.com/bao/uploaded/O1CN01nKlnZY23RvR5xxA9t_!!6000000007253-0-yinhe.jpg",
      type: 1,
    },
    {
      id: "02",
      price: 2000,
      src: "https://img.alicdn.com/bao/uploaded/O1CN01U2VD2U1TybY0whfEu_!!6000000002451-0-yinhe.jpg",
      type: 2,
    },
    {
      id: "03",
      price: 3000,
      src: "https://img.alicdn.com/bao/uploaded/O1CN01jDPb0b1dvX2uX6Oid_!!6000000003798-0-yinhe.jpg",
    },
  ],
  computer: [
    {
      id: "01",
      price: 1000,
      src: "https://img.alicdn.com/bao/uploaded/O1CN01rG3NPL1J5y87aDQou_!!6000000000978-0-yinhe.jpg",
      type: 1,
    },
    {
      id: "02",
      price: 2000,
      src: "https://img.alicdn.com/bao/uploaded/O1CN014Xr2PJ1C5KGwMX2L1_!!6000000000029-0-yinhe.jpg",
      type: 2,
    },
    {
      id: "03",
      price: 3000,
      src: "https://img.alicdn.com/bao/uploaded/O1CN016xmqlm1ui6uNZkdPu_!!6000000006070-0-yinhe.jpg",
      type: 3,
    },
  ],
  headset: [
    {
      id: "01",
      price: 100,
      src: "https://img.alicdn.com/bao/uploaded/O1CN011FQp5k1v3B6EQi3mC_!!6000000006116-0-yinhe.jpg",
      type: 1,
    },
    {
      id: "02",
      price: 200,
      src: "https://img.alicdn.com/bao/uploaded/O1CN01FI6CBx1BzN4PWdtoX_!!6000000000016-0-yinhe.jpg",
      type: 3,
    },
    {
      id: "03",
      price: 300,
      src: "https://img.alicdn.com/bao/uploaded/O1CN01AHkqAF2AGCc81Ixir_!!6000000008175-0-yinhe.jpg",
    },
  ],
});

const { menu, current, list, flag } = toRefs(data);

// 根据对象序号实现动态样式
function changeCurrent(params: object) {
  // ts中使用item.id报错属性不存在（接口或强行断言执行），好像并不是proxy和object问题，而是ts定义的问题。
  data.current = (params as any).id;
}

// 根据布尔值实现动态样式
function changeIsActive(params) {
  data.menu.forEach((item) => {
    item.isActive = false;
  });
  params.isActive = true;
}
// 处理点击更换商品
data.list = data.photoStore;
function changeCommodity(params) {
    // data.photoStore是固定值，data[params.value]是变值。
    data.list = data[params.value]
}
</script>

<style lang="less" scoped>
body {
  padding: 0;
  margin: 0;

  #item {
    width: 600px;
    height: 60px;
    display: flex;
    border: 1px solid red;
    margin: auto;

    & > div {
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin: auto;
      border: 1px solid green;
      border-radius: 10px;
    }

    .active {
      background-color: rgb(233, 99, 99);
    }
  }

  #waves {
    width: 900px;
    height: 210px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

    figure {
      width: 280px;
      height: 200px;
      margin: 5px;
    }

    figure img {
      width: 280px;
      height: 200px;
    }

    figure span {
      position: absolute;
      //   background-color: rgb(199, 40, 40);
    }
  }

  #mountain {
    width: 900px;
    height: 210px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    // background-color: rgb(236, 160, 160);

    & > img {
      width: 280px;
      height: 200px;
    }
  }

  #flower {
    width: 900px;
    height: 210px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

    & > img {
      width: 280px;
      height: 200px;
    }
  }
}
</style>