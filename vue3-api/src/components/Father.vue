<template>
  <Child :title="title"/>
  <h1>{{name}}</h1>
</template>

<script>
import Child from '@/components/Child.vue'
import {ref} from 'vue'

export default {
      name:'Father',
      components: {
            Child
      },
      props: {
            title: String
      },
      setup() {
            const name = ref('王是');

            const changeNameRefs = () => {
                  name.value = 'joke'
            }
            return {
                  name,
                  changeNameRefs
            }
      }
}
</script>

