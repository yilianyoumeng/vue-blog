<template>
  <div class="blog">
    <z-header v-model="isLogin"></z-header>
    <div class="contain">
      <h1 class="tit">{{blogInfo.blogTit}}</h1>
      <div class="blogInfo">
        <div class="tag blue" v-for="tag in blogInfo.tag" v-if="blogInfo.tag[0]=='程序员'">{{tag}}</div>
        <div class="tag orange" v-for="tag in blogInfo.tag" v-if="blogInfo.tag[0]=='生活'">{{tag}}</div>
        <div class="time note"><span>{{blogInfo.time}}</span></div>
        <div class="read note"><span>{{blogInfo.read}}</span></div>
        </div>
      <div class="blogCont" v-html="blogInfo.blogContHtml"></div>
      <div class="caoZuo" v-if="isLogin">
        <div class="change">
          <router-link :to="{path:'/editor',query: {nId: nId}}">修改</router-link>
        </div>
        <div class="delete" @click="deleteBlog">
          删除
        </div>
      </div>
      <z-alert :isAlert="isAlert" alertMsg="确定删除" @click="yesFn"></z-alert>
    </div>
  </div>
</template>
<script>
import $http from 'axios';
import Lib from 'assets/js/common.js';
import zHeader from 'components/zHeader';
import zAlert from 'components/zAlert';
import './sass/blog.scss';
export default {
  name: 'blog',
  components:{
			zHeader,zAlert
	},
  data () {
    return {
      blogInfo:'',
      nId:this.$route.query.nId,
      isLogin:null,
      isAlert:false
    }
  },
  created(){
    this.getInfo();
  },
  beforeCreate: function() {
      document.getElementsByTagName("body")[0].setAttribute("style","background-color:#fff;");
  },
  methods:{
    getInfo:function(){
      let that=this;
      console.log(111);
      console.log(that.isLogin);
      $http({
        url:Lib.api+'/api/getBlogInfo',
        params:{
          nId:that.nId
        },
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        responseType:'json'
      })
      .then((response) => {
        console.log(response.data);
        if(response.data.resCode==100){
          that.blogInfo=response.data.data;
        }else{
          //that.$router.push({path: '/404'});
        }
        
      })
      .catch((response) => {
        console.log('ajaxError');
      })
    },
    deleteBlog:function(){
      let that=this;
      console.log(that.nId);
      let params={
        nId:that.nId
      }
      $http.post(Lib.api+'/api/deleteBlog',params)
      .then((response) =>{
        console.log(response.data);
        that.isAlert=true;
      })
      .catch((reject) =>{
        console.log('ajaxError');
      })
    },
    yesFn:function(){
      this.$router.push({path: '/'});
    }
  }
}
</script>

