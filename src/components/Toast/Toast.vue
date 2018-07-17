<template>
  <transition name="fade">
    <div class="s-tip" v-if="visible">
      <span class="s-tip-text" v-html="message"></span>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    message:String
  },
  data(){
    return {
      visible:false
    }
  }
};
</script>

<style scoped>
.s-tip {
  position: fixed;
  max-width: 80%;
  padding: 20px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}
.s-tip-text{
  font-size: 14px;
  display: block;
  text-align: center
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .3s
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}


</style>
