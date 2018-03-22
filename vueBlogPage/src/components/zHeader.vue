<template>
    <div class="header">
        <div class="contain">
            <router-link to="/">首页</router-link>
            <div class="headerRight">
                <div class="souBox">
                    <input type="text" placeholder="搜索" v-model="search" @keyup.13="searchFn">
                </div>
                <router-link to="/editor" v-if="isLogin">写博客</router-link>
                <div v-if="isLogin"  class="logout" @click="logout">退出</div>
            </div>
            
        </div>
    </div>
</template>
<script>
import $http from 'axios'
import Lib from 'assets/js/common.js'
export default {
	data(){
		return{
            isLogin:false,
            search:''
		}
    },
	created(){
		this.isLoginFn();
	},	  
  	methods:{
      //判断是否登录
		isLoginFn:function(){
			let that=this;
			$http.get(Lib.api+'/api/isLogin')
			.then((response) =>{
				console.log(response.data);
				that.isLogin=response.data.data.isLogin;
                console.log(that.isLogin);
                that.$emit('input',that.isLogin);
			})
			.catch((reject) =>{
				console.log('ajaxError');
			})
    	},
      	logout:function(){
			let that=this;
			console.log('进来这个函数了么')
			$http.post(Lib.api+'/api/logout')
			.then((response) =>{
				console.log(response.data);
				location.reload();
			})
			.catch((reject) =>{
				console.log('ajaxError11');
			})
        },
        //搜索
        searchFn:function(){
            let that=this;
            that.$emit('getQuery',that.search);
            that.$router.push({path: '/?search='+encodeURI(encodeURI(that.search))});
        }
    },


}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    background-color: #fafafa;
    border-bottom: 1px solid #ddd;
    padding:15px 0;
    .contain{
        width: 960px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .headerRight{
            div,a{
                display: inline-block;
                margin-left: 20px;
            }
        }
        a{
            color: #7d7d7d;
            font-size: 16px;
            display: flex; 
        }
        .souBox{
            display: flex; 
            input[type="text"]{
                width: 250px;
                height: 30px;
                background-color: rgba(241, 241, 241, 0.5);
                border:1px solid #ddd;
                border-radius: 15px;
                padding: 5px 15px;
            }
        }
        .logout{
            color: red;
            cursor: pointer;
        }
    }
    

}

</style>
