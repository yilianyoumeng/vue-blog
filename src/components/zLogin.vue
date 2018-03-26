<template>
  <div class="loginBox" v-if="isLoginShow">
    <div class="contain">
      <div class="main">
        <div class="tit">管理员登录</div>
        
        <div class="inpBox">
          <input type="text" v-model="phone" placeholder="用户名">
          <z-error v-model="isError1" :error-msg.sync="errorMsg1" v-bind:style="errorStyle1"></z-error>
          <input type="password" v-model="password"  placeholder="密码" @keyup="keyUpFn($event)">
          <z-error v-model="isError2" :error-msg.sync="errorMsg2" v-bind:style="errorStyle2"></z-error>
        </div>
        <div>
          <button class="big_btn" v-bind:class="{'btn_disable':isBtnDisable,'btn_loading':isBtnDisable&&isLoadingBtn}" v-bind:disabled="isBtnDisable" @click="login">确定</button>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import $http from 'axios';
import Lib from 'assets/js/common.js';
import zError from 'components/zError';
export default {
  name: 'login',
  components:{
			zError
		},
  data () {
    return {
      phone:'',
      password:'',
      //isBtnDisable:true,
      isError1:false,
      errorMsg1:'',
      errorStyle1:'position: absolute;top: 5px;right: 10px;',
      isError2:false,
      errorMsg2:'',
      errorStyle2:'position:absolute;top:40px;right: 10px;',
      isLoadingBtn:false
    }
  },
  props:{
	  isLoginShow:{
		  default:false
	  }
  },
  computed:{
			isBtnDisable:function(){
				if(this.phone!=''&&this.password!=''){
					return false;
				}else{
					return true;
				}
			}
		},
  methods:{
    keyUpFn:function(ev){
      if(ev.keyCode == 13){
          this.login();
      }
    },
    
    //登录
    login:function(){
      var that=this;
      let params = { 
        phone : that.phone,
        password : that.password
      };
	  that.isLoadingBtn=true;
    console.log('执行这里了')
      $http.post(Lib.api+'/api/login',params)
      .then((response) => {
        console.log(response.data)
        if(response.data.resCode==100){
        	that.$router.go(0);
        }else{
          that.isLoadingBtn=false;
          if(response.data.resMsg=='该手机号没有注册'){
            that.isError1=true;
            that.errorMsg1=response.data.resMsg;
          }else{
            that.isError2=true;
            that.errorMsg2=response.data.resMsg;
          }
        }
      })
      .catch((reject) => {
        console.log(reject.data)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/assets.scss';
.loginBox{
	font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.5);
	z-index: 999;
    .contain{
        .main{
            width:380px;
            margin: auto;
            padding:50px 40px;
            background-color: #fff;
            box-shadow: 0 0 8px rgba(0,0,0,.1);
            border-radius: 10px;
            margin-top: 150px;
            .tit{
                @include big_tit;
                text-align: center;
                margin-bottom: 20px;
            }
            .inpBox{
                margin-top: 30px;
                position: relative;
                input[type="text"],input[type="password"]{
                    border: 1px solid #ddd;
                    padding: 10px 5px;
                    width: 300px;
                    margin:0 auto;
                }
                & input:nth-of-type(1){
                    border-bottom: 0;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                }
                & input:nth-of-type(2){
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                }
            }
            .big_btn{
                @include big_btn;
                width: 300px;
                margin-top: 30px;
                &.btn_disable{
                    @include big_btn_disable;
                }
                &.btn_loading{
                    @include big_btn_loading;
                }
            }
        }
    }
}

</style>
