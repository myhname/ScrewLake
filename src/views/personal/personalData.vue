<template>
  <div class="personal-data-container">
    <div class="personal-data-card card-item">
      <div class="avatar-container">
        <img src="../../assets/image/不可以瑟瑟.jpg" alt=""/>
        <div class="ripple-effect-bg"></div>
        <div class="ripple-effect"></div>
      </div>
      <p v-typewriter="{ delay: 100}"> 虽生如草芥，也愿随风而起，追云逐日，俯瞰山海 </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.personal-data-container {
  //min-height: 1350px;
  position: relative;
  //background-color: black;
  padding: 30px 0;

  .personal-data-card {
    width: 80%;
    height: 800px;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    text-shadow: 0 0 15px #fff, 0 0 30px #fff;

    .avatar-container {
      width: 126px;
      height: 126px;
      margin: 0 auto;
      position: relative;
      padding: 17px;

      img {
        width: 92px;
        height: 92px;
        border-radius: 50%;
      }

      .ripple-effect-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 126px;
        height: 126px;
        border: 2px solid #e1afbe;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 3;
        opacity: 0;
        -webkit-animation: warn 1.5s ease-out;
        -moz-animation: warn 1.5s ease-out;
        animation: warn 1.5s ease-out;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        box-shadow: 1px 1px 30px #000;
      }

      .ripple-effect {
        position: absolute;
        width: 126px;
        height: 126px;
        top: 0;
        left: 0;
        border: 1px solid #e1afbe;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 3;
        opacity: 0;
        -webkit-animation: warn1 1.5s ease-out;
        -moz-animation: warn1 1.5s ease-out;
        animation: warn1 1.5s ease-out;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        box-shadow: 1px 1px 30px #000;
      }
    }
  }

  .card-item {
    background-color: rgba(255, 255, 255, 0.35);
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  }
}

@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes warn1 {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0;
  }
}
</style>
