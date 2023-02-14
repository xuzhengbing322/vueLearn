<template>
      <!--插槽接收用户传入的内容，避免按钮内容写死。  
          标签的class样式分为通用样式和用户选用样式
       -->
      <button :class="['my-btn', btnStyle]"><slot></slot></button>
</template>

<script>
export default {
      name: 'MyButton',
      // 接收父组件（用户）传递过来的样式属性
      props: {
            btnStyle: String
      }
}
</script>

<style>
.my-btn {
       height: 34px;
       padding: 0 15px;
       border: none;
       outline: none;
       background-color: #000;
       color: #fff;
 }

/* 通过并列选择器来规定特定的样式呈现 */
 .my-btn.btn-primary {
       background-color: blue;
       color: #fff;
 }

 .my-btn.btn-danger {
       background-color: red;
       color: #fff;
 }

 .my-btn.btn-success {
       background-color: green;
       color: #fff;
 }
</style>