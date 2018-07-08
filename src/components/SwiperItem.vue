<template>
  <div class="r-swiper-item">

  </div>
</template>

<script>
export default {
  name: "swiper-item",
  mounted(){
    this.$nextTick(()=>{
      this.$parent.init()
    })
  },
  beforeDestroy(){
    this.$nextTick(()=>{
      this.$parent.destroy()
    })
  }
};
</script>

<style scoped>
  .r-swiper-item{
    position: absolute;
    top: 0;
    left: 0;
    /* right: 0; */
    /* bottom: 0; */
    width: 100%;
    height: 100%;
  }

</style>
