<template>
  <div id="s-swiper" :style="{height:_height}" ref="swiper" 
  @touchstart = "startMoving"
  @touchmove = "moving"
  @touchend = "endMoving"
  >
    <slot></slot>
    <slot name="indicator">
      <div id="indicator"></div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    _height: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      items:[],
      length:null,
      activeIndex:0,
      start:{
        x:0,
        y:0
      }
    }
  },
  mounted() {
    this.items = Array.from(this.$refs.swiper.querySelectorAll('#s-swiper-item'))
    // console.log(this.items)
    this.length =this.items.length
    this.width = this.$refs.swiper.offsetWidth
    this.setTransform()
    //其实下面有点问题，我这样取width，必须是行内式写法才行
    // this.widths = this.items.map((ele)=>{
    //   return ele.style.width
    // })
    // this.width = Math.max.apply(null,this.widths)
    //

  },
  methods:{
    setTransform(offset){
      offset = offset || 0
      this.items.forEach((ele,index)=>{
        let str = `translate3d(${(index - this.activeIndex) * ele.offsetWidth + offset}px,0,0)`
        ele.style.webkitTransform = str
        ele.style.transform = str
        console.log(str)
        console.log(ele.style.transform)
      })
    },
    startMoving(e){
      this.start.x = e.changedTouches[0].pageX
      this.start.y = e.changedTouches[0].pageY
    },
    moving(e){
      let distanceX = e.changedTouches[0].pageX - this.start.x
      let distanceY = e.changedTouches[0].pageY - this.start.y
      if(Math.abs(distanceX) > Math.abs(distanceY)){
        // console.log('aaaa')
        // console.log(distanceX)
        this.setTransform(distanceX)
      }
    },
    endMoving(e){
      let distanceX = e.changedTouches[0].pageX - this.start.x
      if(Math.abs(distanceX) > this.width * this.proportion){
        if(distanceX > 0){
          this.next()
        }else{
          this.pre()
        }
      }
      this.start.x = 0
      this.start.y = 0
    },
    next(){
      this.activeIndex ++ 
      this.setTransform()
    },
    pre(){
      this.activeIndex -- 
      this.setTransform()
    }

    
  }



};
</script>

<style scoped>
#s-swiper {
  position: relative;
  overflow: hidden;
}
#indicator{
  position: absolute;
  left: 50%;
  bottom: 3vw;
  transform: translate3d(-50%,0,0)
}
</style>
