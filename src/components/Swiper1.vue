<template>
  <div id="s-swiper" :style="{height:_height}" ref="swiper" @touchstart="startMoving" @touchmove="moving" @touchend="endMoving">
    <slot></slot>
    <slot name="indicator">
      <div id="indicator"></div>
    </slot>
  </div>
</template>

<script>
//以前不知道，为什么要动态的设置transition属性，后来才懂得：
//1.如果一开始就设置好的话，那么在页面第一次加载的时候就会有图片拖动的情况出现，
//2.在滑动的时候，由于transform的变化，若不是动态的设置transtion（在滑动的时候去掉transition，在滑动结束后添加上transition），
//  滑动的时候就会出现延迟，影响体验，而怎么才能动态设置呢？我现在想的就是把一个class与一个变量（isMoving）绑定，试试。
//  但是很明显，这样不行，因为有slot存在，我们无法像以前那样直接在DOM元素上:class={xxx:yyy}所以这次还是只能通过原生js操作Dom元素
export default {
  name: "swiper",
  props: {
    _height: {
      type: String,
      required: true
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      length: null,
      activeIndex: 0,
      proportion: 0.3,
      resistance:0.3,
      start: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    this.items = Array.from(
      this.$refs.swiper.querySelectorAll("#s-swiper-item")
    );
    // console.log(this.items)
    this.length = this.items.length;
    this.width = this.$refs.swiper.offsetWidth;
    this.setTransform();
    this.removeTransition();
    //其实下面有点问题，我这样取width，必须是行内式写法才行
    // this.widths = this.items.map((ele)=>{
    //   return ele.style.width
    // })
    // this.width = Math.max.apply(null,this.widths)
    //
  },
  methods: {
    setTransform(offset) {
      offset = offset || 0;
      this.items.forEach((ele, index) => {
        let str = `translate3d(${(index - this.activeIndex) * ele.offsetWidth +
          offset}px,0,0)`;
        ele.style.webkitTransform = str;
        ele.style.transform = str;
        // console.log(str)
        // console.log(ele.style.transform)
      });
    },
    setTransition() {
      this.items.forEach((ele, index) => {
        let str = "transform 0.3s ease";
        ele.style.transition = str;
      });
    },
    reset() {
      this.resetStartPoint();
      this.removeTransition();
    },
    resetStartPoint() {
      this.start.x = 0;
      this.start.y = 0;
    },
    removeTransition() {
      this.items.forEach((ele, index) => {
        ele.style.transition = "";
      });
    },
    startMoving(e) {
      this.start.x = e.changedTouches[0].pageX;
      this.start.y = e.changedTouches[0].pageY;
      this.removeTransition();
    },
    moving(e) {
      e.stopPropagation()
      e.preventDefault();

      let distanceX = e.changedTouches[0].pageX - this.start.x;
      let distanceY = e.changedTouches[0].pageY - this.start.y;
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        // console.log('aaaa')
        // console.log(distanceX)
        if((this.activeIndex === 0 && distanceX > 0)  || (this.activeIndex === this.items.length - 1 && distanceX < 0)) {
          distanceX = distanceX * this.resistance
        }
        this.setTransform(distanceX);
      }
    },
    endMoving(e) {
      let distanceX = e.changedTouches[0].pageX - this.start.x;
      if (Math.abs(distanceX) > this.width * this.proportion) {
        if (distanceX < 0) {
          this.setTransition();
          this.next();
        } else {
          this.setTransition();
          this.pre();
        }
      } else {
        this.setTransition()
        this.setTransform();
      }
    },
    next() {
      if (this.activeIndex === this.items.length - 1) {
        if (this.loop) {
          this.removeTransition();//如果不要这句的话，切换会不会太过突兀了？
          this.activeIndex = 0;
          this.setTransform();
          return;
        } else {
          this.setTransform();
          return;
        }
      } else {
        this.activeIndex++;
        this.setTransform();
      }
    },
    pre() {
      if (this.activeIndex === 0) {
        if (this.loop) {
          this.removeTransition();
          this.activeIndex = this.items.length - 1;
          this.setTransform();
          return;
        } else {
          this.setTransform();
          return;
        }
      } else {
        this.activeIndex --;
        this.setTransform();
      }
    }
  }
};
</script>

<style scoped>
#s-swiper {
  position: relative;
  overflow: hidden;
}
#indicator {
  position: absolute;
  left: 50%;
  bottom: 3vw;
  transform: translate3d(-50%, 0, 0);
}
</style>
