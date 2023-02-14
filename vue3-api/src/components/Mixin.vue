<template>
      <div id="app">
            <!--my-btn是通用样式，btn-primary是专有样式。  -->
            <button class="my-btn btn-primary">BUTTON</button>
      </div>
</template>

<script>
export default {
      name: 'Mixin'
}
</script>

<style>
/* 通常，UI库是整个项目共用的 */
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