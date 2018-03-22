<template>
  <div class="editor">
    <z-header></z-header>
    <div class="contain">
      <div class="main">
        <div class="tit">编辑博客页面</div>
        <input class="infoTit" type="text" v-model="blogTit" v-on:keyup="draftFn" placeholder="在这里输入标题">
        <div class="tagBox">
          <div class="selectBox">
            <select v-model="tag" required>
              <option value="" disabled selected hidden>选择博客标签</option>
              <option value="程序员">程序员</option>
              <option value="生活">生活</option>
            </select>
          </div>
          <input class="newTag" type="text" v-model="newTag" placeholder="新标签">
        </div>
        <div type="text/plain" class="editorContBox" id="account--editor" @keyup="blogContHtml=editor.txt.html()"></div>
        <div class="tip" v-if="isDraft">草稿已保存</div>
        <button type="button" v-if="nId==undefined" class="normal_btn" @click="setBlog">发布</button>
        <button type="button" v-else class="normal_btn" @click="changeBlog">修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import $http from 'axios';
import wangEditor from 'wangeditor'; 
import Lib from 'assets/js/common.js';
import zHeader from 'components/zHeader';
import './sass/editor.scss';
let timeout;
export default {
  name: 'Editor',
  components:{
			zHeader
	},
  data () {
    return {
      blogTit:'',
      blogCont:'',
      blogContHtml:'',
      nId:this.$route.query.nId,
      tag:'',
      newTag:'',
      editor:null,
      isDraft:false//草稿是否保存成功
    }
  },
  created(){
    if(this.nId!=undefined){
      this.getBlogInfo();
    }else{
      this.getDreft()
    }
    
  },
  mounted(){
    this.editor = new wangEditor('#account--editor');
    this.editor.customConfig.uploadImgShowBase64 = true;  // 上传图片到服务器
    this.editor.create();
    
  },
  watch:{
    editor:function(){
      this.draftFn();
    },
    blogContHtml:function(){
      this.draftFn();
    },
    blogTit:function(){
      this.draftFn()
    },
    tag:function(){
      this.draftFn()
    }

  },
  methods:{
    //新建博客
    setBlog:function(){
      let that=this;
      console.log(that.nId);
      that.blogCont=that.editor.txt.text();
      let params={
        blogTit:that.blogTit,
        blogCont:that.blogCont,
        blogContHtml:that.editor.txt.html(),
        tag:[that.tag,that.newTag]
      }
      console.log(params);
      $http.post(Lib.api+'/api/setBlog',params)
      .then((response) =>{
        console.log(response.data);
        if(response.data.resCode==100){
          that.$router.push({path: '/'});
        }
      })
      .catch((reject) =>{
        console.log('ajaxError');
      })
    },
    //博客原有内容
    getBlogInfo:function(){
      let that=this;
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
          that.blogTit=response.data.data.blogTit;
          that.blogCont=response.data.data.blogCont;
          that.blogContHtml=response.data.data.blogContHtml;
          that.tag=response.data.data.tag[0];
          that.newTag=response.data.data.tag[1];
        }
        
      })
      .catch((response) => {
        console.log('ajaxError');
      })
    },
    //修改博客
    changeBlog:function(){
      let that=this;
      console.log(that.nId);
      that.blogCont=that.editor.txt.text();
      let params={
        blogTit:that.blogTit,
        blogCont:that.blogCont,
        tag:[that.tag,that.newTag],
        blogContHtml:that.editor.txt.html(),
        nId:that.nId
      }
      $http.post(Lib.api+'/api/changeBlog',params)
      .then((response) =>{
        console.log(response.data);
        if(response.data.resCode==100){
          that.$router.push({path: '/'});
        }
      })
      .catch((reject) =>{
        console.log('ajaxError');
      })
    },
    //自动保存草稿
    draftFn:function(){
      let that=this;
      clearTimeout(timeout);
      timeout = setTimeout(//只执行一次
      function(){
        that.blogCont=that.editor.txt.text();
        if(that.blogTit!=''||that.blogCont!=''||that.tag!=''||that.newTag!=''){
          console.log('保存');
          console.log([that.tag,that.newTag]);
          let params={
            blogTit:that.blogTit,
            blogCont:that.blogCont,
            tag:[that.tag,that.newTag],
            blogContHtml:that.editor.txt.html()
          }
          console.log(params);
          $http.post(Lib.api+'/api/draft',params)
          .then((response) =>{
            console.log(response.data);
            if(response.data.resCode==100){
              console.log('保存成功');
              that.isDraft=true;
              setTimeout(function(){
                that.isDraft=false;
              },1500)
            }
          })
          .catch((reject) =>{
            console.log('ajaxError');
          })
        }
      },3000)
    },
    getDreft:function(){
      let that= this;
      $http({
        url:Lib.api+'/api/getDraftInfo',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        responseType:'json'
      })
      .then((response) => {
        console.log('获取草稿成功')
        console.log(response.data);
        if(response.data.resCode==100){
          console.log(response.data.data.blogTit);
          that.blogTit=response.data.data.blogTit;
          that.tag=response.data.data.tag[0];
          that.newTag=response.data.data.tag[1];
          that.editor.txt.html(response.data.data.blogContHtml)
        }
      })
      .catch((response) => {
        console.log('ajaxError');
      })
      
    }
  }
}
</script>