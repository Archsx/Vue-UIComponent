<template>
  <div id="s-swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted(){
    // this.$parent.init()
  },
  beforeDestroy(){
    // this.$parent.destroy()
  }

}
</script>

<style scoped>
  #s-swiper-item{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
  }
</style>
