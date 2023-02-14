<template>
      <h2>ssss{{count}}</h2>
      <button @click="plus">增加</button>
</template>

<script>
import {watchEffect, watch, ref} from 'vue'

export default {
      name: 'Test',
      props: {
            title: String,
            count: Number
      },
      // 注册自定义事件名称
      emits: ['plusHandler'],
      setup(props, context) {
            // 1、监视和修改props属性
            // watchEffect( () => {
            //       console.log(props.title)
            // })
            
            const plus = () => {
                  context.emit('plusHandler', 100)
            }

            return {
                  plus,
            }

            
            // console.log(context.attrs)

            // return {
            //       //没有props时，attrs才奏效
            //       attrs: context.attrs
            // }
      },
}
</script>