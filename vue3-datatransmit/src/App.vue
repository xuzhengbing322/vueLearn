<template>
  <Mother />
  <Grandpa />

</template>

<script>
import Mother from '@/components/class1/Mother.vue'
import Grandpa from '@/components/class2/Grandpa.vue'

export default {
  name: 'App',
  components: {
    Mother,
    Grandpa
  }
}
</script>

