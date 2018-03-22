<template>
  <div class="login">
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
          <button class="big_btn" v-bind:class="{'btn_disable':isBtnDisable,'btn_loading':isBtnDisable&&isLoadingBtn}" v-bind:disabled="isBtnDisable||isLoadingBtn" @click="login">确定</button>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import $http from 'axios';
import Lib from 'assets/js/common.js';
import zError from 'components/zError';
import './sass/login.scss';
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
  beforeCreate: function() {
      document.getElementsByTagName("body")[0].setAttribute("style","background-color:#f1f1f1;");
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
      $http.post(Lib.api+'/api/login',params)
      .then((response) => {
        console.log(response.data)
        if(response.data.resCode==100){
          that.$router.push({path: '/'});
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
