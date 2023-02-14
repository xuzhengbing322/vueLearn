<template>
      <h1>爷爷的钱：{{grandpaM}}</h1>
      <h1>爷爷的房子：{{grandpaHome}}</h1>
      <button @click="add">加房子</button>
      <Father />
</template>

<script>
import { provide } from '@vue/runtime-core';
import Father from '@/components/class2/Father.vue'
import {ref} from 'vue'


export default {
      name: 'Grandpa',
      components: {
            Father,    
      },
      setup() {
            const grandpaM = 10000;
            const grandpaHome = ref(1);

            provide('grandpaM', grandpaM);
            provide('grandpaHome', grandpaHome)

            const add = () => {
                  console.log(grandpaM, grandpaHome)
                   grandpaHome.value += 1
            }

            return {
                  grandpaM,
                  grandpaHome,
                  add
            }
      }
}
</script>