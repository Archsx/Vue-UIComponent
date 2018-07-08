<template>
  <div ref="swiper" class="r-swiper" :style="{height:_height}" @touchstart='moveStart' @touchmove='moving' @touchend='moveEnd'>
    <slot></slot>
    <slot name="indicator">
      <div class="indicator">{{active + 1}}</div>
    </slot>
  </div>
</template>




<script>
/*
  其实使用方法大概应该是这样的：
  foo.vue

    HTML:

    <swiper-item height="60px">
      <swiper-item>
        <img/>
        //...
      </swiper-item>
    </swiper>

    Script:
    import Swiper from 'path/to/swiper'
    import SwiperItem from 'path/to/swiperitem'

  这里是直接使用的slot插槽的形式
  <img>插在swiperItem的slot上，而swiperItem又插在swiper的slot上。



  注意下，这里的swiper和swiperItem虽然在Dom上这样看起来是父子组件，但是请注意，父子组件以往是通过在父组件中引用子组件的形式，
  这时的foo.vue应该是这样的：
  HTML:

  <swiper></swiper>

  Script:

  import Swiper from 'path/to/swiper'

  而这时的swiper为

  HTML:
  <swiper-item :foo="bar">  </swiper-item>
  
  Script:

  import SwiperItem from 'path/to/swiper-item'

  发现了吗？有时候想传递一些Dom结构的时候，利用props属性是不行的，这时候slot就派上用场了！！

*/

export default {
  name: "swiper",
  props: {
    //注意下下面的默认写法
    height: {
      type: [Number, String],
      default: "auto"
    }
  },
  data() {
    return {
      isInit: false,
      _width: 0,
      duration: 300,
      container: null,
      items: [],
      active: 0,
      resistance:0.3,
      sensitivity:60,
      start: {
        x: 0,
        y: 0
      },
      move: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    _height() {
      if (typeof this.height === "number") {
        return this.height + "px";
      } else {
        return this.height;
      }
    }
  },
  methods: {
    each(array, callback) {
      for (let i = 0, l = array.length; i < l; i++) {
        if (callback(array[i], i) === false) {
          break;
        }
      }
    },
    init() {
      //避免有多个子组件挂载的时候导致多次初始化(即包含的swiperItem比较多的时候，避免每个swiperItem组件调用父组件(这里写父组件是说DOM结构上)swiper的init方法)
      if (this.isInit) {
        return;
      }
      this.isInit = true;
      this.container = this.$refs.swiper;

      this.items = this.container.querySelectorAll(".r-swiper-item");
      this.updateItemWidth();
      this.setTransform();
      this.setTransition("none");
    },
    updateItemWidth() {
      this._width =
        this.container.offsetWidth || document.documentElement.offsetWidth;
    },
    setTransform(offset) {
      offset = offset || 0;
      this.each(this.items,(item ,i)=>{
        let distance = (i - this.active) * this._width + offset
        let transform = `translate3d(${distance}px,0,0)`;
        item.style.transform = transform
        
      })
    },
    setTransition(duration){
      duration = duration || this.duration
      duration = typeof duration === 'number' ? (duration + 'ms') : duration
      each(this.items,(item)=>{
        item.style.transition = duration
      })
    },
    moveStart(e){
      this.start.x = e.changedTouches[0].pageX
      this.start.y = e.changedTouches[0].pageY
      this.setTransition('none')
    },
    moving(e){
      e.preventDefault();
      e.stopPropagation();
      let distanceX = e.changedTouches[0].pageX - this.start.x
      let distanceY = e.changedTouches[0].pageY - this.start.y

      if(Math.abs(distanceX) > Math.distanceY){
        this.isMoving = true
        this.move.x = this.start.x + distanceX
        this.move.y = this.start.y + distanceY
        if((this.active === 0 && distanceX > 0) || (this.active === (this.items.length - 1)) && distanceX < 0){
          distanceX = distanceX * this.resistance
        }
        this.setTransform(distanceX)
      }

    },
    moveEnd(e){
      if(this.isMoving){
        e.preventDefault();
        e.stopPropagation()
        let distance = this.move.x - this.start.x
        if(Math.abs(distance) > this.sensitivity){
          if(distance < 0){
            this.next()
          }else{
            this.prev()
          }
        }else{
          this.back()
        }
        this.reset()
        this.isMoving = false
      }
    },
    next(){
      let index = this.active + 1;
      this.go(index)
    },
    prev(){
      let index = this.active - 1;
      this.go(index)
    },
    back(){
      this.setTransition()
      this.setTransform()
    },
    reset(){
      this.start.x = 0;
      this.start.y = 0;
      this.move.x = 0;
      this.move.y = 0
    },
    destroy(){
      this.setTransition('none')
    },
    go(index){
      this.active = index
      if(this.active < 0){
        this.active = 0
      }else if(this.active > this.items.length - 1){
        this.active = this.isMoving ? this.items.length -1 : 0
      }
      this.$emit('change',this.active)
      this.setTransition()
      this.setTransform()
    }
  }
};
</script>

<style scoped>
#r-swiper {
  position: relative;
  overflow: hidden;
}
#r-swiper .indicator {
  position: absolute;
  right: 3vw;
  bottom: 3vw;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  border-radius: 50%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 14px;
}
</style>
