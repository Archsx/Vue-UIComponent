<template>
  <div id="app">
    <h1 ref="message">{{message}}</h1>
    <button ref="myButton" @click="clickedButton">click me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "hi sx"
    };
  },
  mounted(){
    setTimeout(()=>{
      this.$refs.message.innerText = 'delay 2000ms modified message'
    },2000)
  },
  methods: {
    clickedButton: function() {
      console.log(this.$refs);
      this.$refs.myButton.innerText = this.message;
    }
  }
};
</script>

<style>
</style>
