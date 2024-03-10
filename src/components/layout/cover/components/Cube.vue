<template>
  <div class="cube-container">
    <div class="cube">
      <div class="front"></div>
      <div class="back"></div>
      <div class="left"></div>
      <div class="right"></div>
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@lengthOfSide: 250px;

.cube-container {
  position: relative;
  perspective: 800px;
  perspective-origin: 50% (@lengthOfSide/2);

  .cube {
    position: relative;
    width: @lengthOfSide;
    transform-style: preserve-3d;
    transform-origin: (@lengthOfSide/2) (@lengthOfSide/2);
    animation: spin 5s infinite linear;

    div {
      position: absolute;
      width: @lengthOfSide;
      height: @lengthOfSide;
    }
  }
}

// 先旋转再位移，会带着坐标轴一起选择
// 先位移再旋转，位移时轴的方向没变

.front {
  background: url("../../../../assets/image/fate1.jpg") no-repeat center top / cover;
  opacity: .9;
  transform: translateZ((@lengthOfSide/2));
}

.back {
  background: url("../../../../assets/image/fate2.jpg") no-repeat center top / cover;
  opacity: .9;
  transform: rotateY(180deg) translateZ((@lengthOfSide/2));
}

.left {
  background: url("../../../../assets/image/fate3.jpg") no-repeat center top / cover;
  opacity: .9;
  transform: rotateY(-90deg)  translateX(-(@lengthOfSide/2));
  transform-origin: left center;
}

.right {
  background: url("../../../../assets/image/fate4.jpg") no-repeat center top / cover;
  opacity: .9;
  transform: rotateY(90deg)  translateX((@lengthOfSide/2));
  transform-origin: right center;
}

.top {
  background: url("../../../../assets/image/fate5.jpg") no-repeat center top / cover;
  opacity: .9;
  transform: rotateX(-90deg)  translateY(-(@lengthOfSide/2));
  transform-origin: center top;
}

.bottom {
  background: url("../../../../assets/image/fate6.jpg") no-repeat center top / cover;
  opacity: .9;
  transform: rotateX(90deg)  translateY((@lengthOfSide/2));
  transform-origin: center bottom;
}

@keyframes spin {
  from {
    transform: rotateX(0) rotateY(0);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>