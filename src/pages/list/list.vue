<template>
  <div class="list">
    <z-header v-model="isLogin" v-on:getQuery="setSearch"></z-header>
    <div class="contain">
      <div class="leftBox">
        <div class="item" v-for="item in blogList">
          <div class="tit">
            <router-link :to="{path:'/blog',query: {nId: item._id}}">{{item.blogTit}}</router-link>
          </div>
          <div class="blogInfo">

            <div class="tag blue" v-for="tag in item.tag" v-if="item.tag[0]=='程序员'">
              {{tag}}
            </div>
            <div class="tag orange" v-for="tag in item.tag" v-if="item.tag[0]=='生活'">{{tag}}</div>
            <div class="time note"><span>{{item.time}}</span></div>
            <div class="read note"><span>{{item.read}}</span></div>
          </div>
          <div class="blogCont">{{item.blogCont}}</div>
        </div>
      </div>
      <div class="rightBox">
        <div class="tit">作者简介</div>
        <div class="imgBox">
        </div>
        <div class="word">
          <div>Jude</div>
          <div>90后，女，白羊座</div>
          <div>qq:1329395802</div>
        </div>
      </div>
    </div>
    <!--版权信息-->
    <div class="Copyright"><span v-on:click="goPageLogin">Copyright</span> ©2017</div>
    <z-login :isLoginShow="isLoginShow"></z-login>
  </div>
</template>
<script>
import $http from 'axios';
import zHeader from 'components/zHeader';
import zLogin from 'components/zLogin';
import Lib from 'assets/js/common.js';
import './sass/list.scss';
let clickI=0;
export default {
  name: 'list',
  components:{
			zHeader,zLogin
	},
  data () {
    return {
      isLogin:false,
      blogList:null,
      search:Lib.getUrlQuery('search'),
      isLoginShow:false
    }
  },
  created(){
    this.getInfo();
  },
  watch:{
    search:function(){
      setTimeout(()=>{//只执行一次
        location.reload();
      },50)
    }
  },
  methods:{
    getInfo:function(){
      let that=this;
      let search=Lib.getUrlQuery('search');
      search=decodeURI(search);
      let params={
        limit:10,
        pageNum:1,
        search:search
      }
      $http({
        url:Lib.api+'/api/getBlogList',
        params:params,
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        responseType:'json'
      })
      .then((response) => {
        console.log(response.data);
        if(response.data.resCode==100){
          that.blogList=response.data.data;
        }
        
      })
      .catch((reject) => {
        console.log(reject.data)
      });
    },
    setSearch:function(data){
      let that=this;
      that.search=data;
    },
    goPageLogin:function(){
      let that=this;
      clickI=clickI+1;
      if(clickI>=5){
        that.isLoginShow=true;
      }
    }
  }
}
</script>
