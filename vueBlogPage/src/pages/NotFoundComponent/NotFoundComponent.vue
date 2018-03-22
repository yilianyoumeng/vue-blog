<template>
  <div>
    <div class="page404"></div>
    <router-link to="/">返回首页</router-link>
  </div>
  
</template>
<script>
export default {
  name: 'page404',
  data () {
    return {
    }
  },
  created(){
  },
  methods:{
  }
}
</script>
<style scoped>
div{
  text-align: center;
}
.page404{
  background-image: url(./img/page404.jpg);
  width: 550px;
  height: 309px;
  background-repeat: no-repeat;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  }
  a{
    color: #8eb9f5;
    text-align: center;
    
  }
</style>


