<template>
  <div class="main">
    <RouterView />
    <div class="bottom-box">
      <div class="bottom-msg">
        <a href="/cover">螺丝湖观光指北</a>
        &nbsp; | &nbsp;
        <span> 已运行 {{ runTime }} </span>
        <br />
        Copyright  2024-04-02 Night Rain ShanXi ICP Prepared
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.main{
  min-height: 100%;
  position: relative;
  padding: 0  0 50px 0;
}

.bottom-box {
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #3a323296;
  color: #e4e7ed;

  .bottom-msg {
    width: 500px;
    text-align: center;
    margin: 0 auto;
    line-height: 25px;

    a {
      color: #990055;
    }
  }
}
</style>