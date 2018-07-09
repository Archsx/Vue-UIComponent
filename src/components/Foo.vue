<template>
  <div id="foo">
    <swiper _height='100px'>
      <swiper-item v-for="(item, index) in items" :key="index">
        <div :style="{background:'url(' + item.pic + ')',width:'300px',height:'200px',backgroundSize:'cover',transition:'all .3s'}">  </div>
      </swiper-item>
    </swiper>  
  </div>
</template>

<script>
import Swiper from "./Swiper1";
import SwiperItem from "./SwiperItem1";
export default {
  components: { Swiper, SwiperItem },
  data(){
    return {
      items:[{
        pic:'https://i.loli.net/2018/07/10/5b43a47b497d6.jpeg'
      },{
        pic:'https://i.loli.net/2018/07/10/5b43a47b5a6a9.jpeg'
      }]
    }
  }

};
</script>

<style>
</style>
