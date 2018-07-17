<template>
  <div class="tip">
    <s-tip ref="tip" :message="msg" ></s-tip>
  </div>
</template>

<script>
import STip from './Toast/Toast'
export default {
  components:{
    STip
  },
  data(){
    return {
      msg:'All you need is lOVE',
    }
  },
  methods:{
  },
  mounted(){
    // this.$nextTick(()=>{
    //   this.$refs.tip.visible = true
    //   setTimeout(()=>{
    //     this.$refs.tip.visible = false
    //   },2000)
    // })
    this.$tip({
      // text:'Hi',
      message:'Hi'
    })
  }
}
</script>

<style>

</style>
