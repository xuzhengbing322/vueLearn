<template>
  <!-- <div class="home">
     <h1>This is an home page</h1>
     <router-link to="/home/news">News</router-link>
     <router-link to="/home/message">Message</router-link>
     <router-view></router-view>
  </div> -->
  <div class="common-layout">
    <!-- 外层容器 -->
    <el-container>
      <!-- 侧边容器 -->
      <el-aside width="200px" class="sideClass">
        <router-link to="/home/news" >News</router-link>
        <router-link to="/home/message">Message</router-link>
      </el-aside>
      
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script >
</script>

<style scoped>
.sideClass {
  display: flex;
  flex-direction:column;
  background-color: rgb(170, 170, 241);
  font-size:20px;
  text-decoration:none
}

router-link{
  text-decoration-line:none
}

</style>