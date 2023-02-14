<template>
  <h1>家庭资产：{{ fatherM }}</h1>
  <Father
    :fatherM="fatherM"
    @earnMoneyEvent="getMoney"
    @update:value="value => fatherM = value"
  />
  <Child
    :childM="childM"
    @getMoneyFromMotherEvnet="getMoneyFromMotherHandler"
  />
</template>

<script>
import Father from "@/components/class1/Father.vue";
import Child from "@/components/class1/Child.vue";
import { reactive, ref, toRefs } from "vue";

export default {
  name: "Mother",
  components: {
    Father,
    Child,
  },
  setup() {
    const data = reactive({
      fatherM: 3000,
      childM: 10,
    });
    const fatherM = ref(3000);
    const getMoney = (money) => {
      data.fatherM += money;
    };
    const getMoneyFromMotherHandler = (num) => {
      data.childM += num;
      data.fatherM -= num;
    };

    return {
      ...toRefs(data),
      getMoney,
      getMoneyFromMotherHandler,
    };
  },
};
</script>