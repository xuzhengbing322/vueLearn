<template>
      <input type="text" class="my-input" :placeholder="placeholderText" />
</template>

<script>
export default {
      name: 'MyInput',
      props: {
            placeholderText: {
                  type: String,
                  default: 'This is my input'
            }
      }
}
</script>

<style>
 .my-input {
       border: 1px solid blue;
 }
</style>