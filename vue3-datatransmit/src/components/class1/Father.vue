<template>
  <div>
    <h2>父亲的资产：{{fatherM}}</h2>
    <button @click="earnMoney">赚钱</button>
    <button @click="invest">投资</button>
  </div>
</template>

<script>


export default {
      name: 'Father',
      props: {
        fatherM: Number
      },
      emits: ['earnMoneyEvent','update:value'],
      setup (props,{emit},) {
            // 将子组件Father的数据传递给父组件Mother
            const earnMoney = () => {
                  emit('earnMoneyEvent', 100)
            };
            const invest = () => {
                  emit('update:value', 1000)
            }

            return {
                  earnMoney,
                  invest
            }
      }

}
</script>