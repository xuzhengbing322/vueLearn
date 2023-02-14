<template>
      <h1>孙子继承爷爷的财产：{{sonM}}</h1>
      <h1>孙子继承爷爷的房产数：{{sonHome}}</h1>
      <button @click="add">再加房子</button>
</template>

<script>
import { inject } from '@vue/runtime-core';
export default {
  name: "Father",
  setup () {
        const sonM = inject('grandpaM', 'loading...');
        const sonHome = inject('grandpaHome', 'loading...');

        const add = () => {
              console.log(sonM,sonHome);
              sonHome.value +=1
        }

        return {
              sonM,
              sonHome,
              add
        }
  }
};


</script>