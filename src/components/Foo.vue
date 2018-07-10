<template>
  <div id="foo">
    <swiper _height='100px' class="pad">
      <swiper-item v-for="(item, index) in items" :key="index">
        <div :style="{background:'url(' + item.pic + ')',backgroundSize:'cover'}" class="content">  </div>
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
        pic:'https://i.loli.net/2018/07/10/5b44c5fd9b999.jpeg'
      },{
        pic:'https://i.loli.net/2018/07/10/5b43a47b5a6a9.jpeg'
      },{
        pic:'https://i.loli.net/2018/07/10/5b44c819a8aa5.jpeg'
      }]
    }
  }

};
</script>

<style scoped>
.content{
  width: 100%;
  height: 100%;
}
.pad{
  margin: 20px;
}



</style>
