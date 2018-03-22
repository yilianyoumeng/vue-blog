import Vue from 'vue'
import Router from 'vue-router'
import List from '@/pages/list/list'
import Login from '@/pages/login/login'
import Editor from '@/pages/editor/editor'
import Blog from '@/pages/blog/blog'
import NotFoundComponent from '@/pages/NotFoundComponent/NotFoundComponent'
import $http from 'axios'
import Lib from 'assets/js/common.js'

Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    { 
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    { 
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    { path: '/404', 
      name: '404',
      component: NotFoundComponent
    },
    { path: '*', 
      component: NotFoundComponent
    }
  ]
})
router.beforeEach((to, from, next) => {
  const {path}=to;
  let isLogin=null;
  $http.get(Lib.api+'/api/isLogin')
  .then((response) =>{
    console.log(response.data);
    if(response.data.data.isLogin==true){
      if(path==='/login'){
          next('/');
      }else{
        next();
      }
    }else{
      console.log(path);
      if(path==='/editor'){
        console.log('没登录，编辑页面跳到首页');
          next('/');
      }else{
        console.log('登录了，刷新编辑页面');
        next();
      }
    }
  })
  .catch((reject) =>{
    console.log('ajaxError11');
  })
})
export default router
