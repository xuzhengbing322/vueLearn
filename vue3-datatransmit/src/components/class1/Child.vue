<template>
      <h2>子女资产：{{childM}}</h2>
      <button @click="getMoneyFromMother">向妈妈要钱</button>
</template>

<script>
export default {
      name: 'Child',
      props: {
            childM: Number
      },
      emits: ['getMoneyFromMotherEvnet'],
      setup (props, {emit}) {
            const getMoneyFromMother = () => {
                  emit('getMoneyFromMotherEvnet', 10)
            };

            return {
                  getMoneyFromMother
            }
      }
}
</script>