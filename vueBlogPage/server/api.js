// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const baseUrl = 'http://localhost:8080/#'
// const baseUrl = 'http://50.63.202.57:8080/#'


/************** 创建(set) 读取(get) 更新(change) 删除(delete) **************/
//强制增加管理员
let admain = new models.Login({
        phone : '18668017235',
        password : 'zhuzhidan123'
    });
// 保存数据admain数据进mongoDB
admain.save();
// 注册
router.post('/api/register',(req,res) => {
    try{
        //phone 和password是必传
        if(req.body.phone!=false&&req.body.password!=false){
            let newAccount = new models.Login({
                phone : req.body.phone,
                password : req.body.password
            });
            // 保存数据newAccount数据进mongoDB
            newAccount.save((err,data) => {
                if (err) {
                    res.send({data:{},resCode:200,resMsg:'请求失败'});
                }else {
                    res.send({data:{},resCode:100,resMsg:'请求成功'});
                }
            });
        }else{
            res.send({data:{},resCode:200,resMsg:'参数错误'});
        }
    }catch(e){
        console.log(e)
    }
});
// 登录
router.post('/api/login',(req,res) => {
    try{
        // 通过模型去查找数据库
        if(req.body.phone!=false&&req.body.password!=false){
            models.Login.findOne({'phone':req.body.phone},function(err,data){
                if(err){
                    res.send({data:{},resCode:200,resMsg:'请求失败'})
                }else{
                    if(data==null){
                        res.send({data:{},resCode:200,resMsg:'该手机号没有注册'});
                    }else if(data.password!=req.body.password){
                        res.send({data:{},resCode:200,resMsg:'密码错误'});
                    }else{
                        req.session.isLogin = true;
                        res.send({data,resCode:100,resMsg:'请求成功'});
                    }              
                }
            });
        }else{
            res.send({data:{},resCode:200,resMsg:'参数错误'});
        }
    }catch(e){
        console.log(e)
    }
    
});

//判断是否登录
router.get('/api/isLogin',(req,res) =>{
    try{
        if(req.session.isLogin){
            let resMsg="已登录";
            let isLogin=true;
            res.send({'data':{'isLogin':isLogin},'resCode':200,'resMsg':resMsg})
        }else{
            let resMsg="未登录";
            let isLogin=false;
            res.send({'data':{'isLogin':isLogin},'resCode':200,'resMsg':resMsg})
        }
    }catch(e){
        console.log(e)
    }
});

//退出登录
router.post('/api/logout',(req,res) =>{
    try{
        req.session.destroy(function(err) {
            if(err){
                res.json({resCode: 200, resMsg: '退出登录失败'});
                return;
            }
            res.clearCookie('connect.sid');
            res.send({'data':{},'resCode':200,'resMsg':'退出登录成功'})
        });
    }catch(e){
        console.log(e)
    }
})
//修改登录密码
router.post('/api/changePwd',(req,res) => {
    try{
        if(req.body.phone!=false&&req.body.oldPassword!=false&&req.body.newPassword!=false){
            models.Login.findOne({'phone':req.body.phone},function(err,data){
                if(err){
                    res.send({data:{},resCode:200,resMsg:'请求失败'})
                }else{
                    if(data==null){
                        res.send({data:{},resCode:200,resMsg:'该手机号没有注册'});
                    }else if(data.password!=req.body.oldPassword){
                        res.send({data:{},resCode:200,resMsg:'密码错误'});
                    }else{
                        models.Login.update({'password':req.body.oldPassword},{$set:{'password':req.body.newPassword}},function(err,data){
                            if(err){
                                res.send({data:{},resCode:200,resMsg:'请求失败'})
                            }else{
                                res.send({data,resCode:100,resMsg:'请求成功'});
                            }
                        })
                    }              
                }
            });
        }else{
            res.send({data:{},resCode:200,resMsg:'参数错误'});
        }
    }catch(e){
        console.log(e)
    }
    
});

//新建博客
router.post('/api/setBlog',(req,res) =>{
    try{
        if(req.body.blogTit!=false&&req.body.blogCont!=false&&req.body.blogContHtml!=false&&req.body.tag!=false){
            //存储日期
            let date = new Date();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = date.getFullYear() + '年' + month + '月' + strDate
                    + "日" + date.getHours() + ":" + date.getMinutes();
            let newAccount=new models.Blog({
                blogTit:req.body.blogTit,
                blogCont:req.body.blogCont,
                blogContHtml:req.body.blogContHtml,
                time:currentdate,
                draft:0,//不是草稿
                read:0,
                tag:req.body.tag
            })
            console.log(req.body.tag);
            //存入数据库
            newAccount.save((err,data) =>{
                if (err) {
                    res.send(err);
                }else {
                    res.send({data,resCode:100,resMsg:'请求成功'});
                }
            })
        }else{
            res.send({data,resCode:200,resMsg:'请求成功'});
        }
        
    }catch(e){
        console.log(e)
    }

})
//查询博客内容
router.get('/api/getBlogInfo',(req,res) =>{
    try{
        let nId=req.query.nId;
        models.Blog.findOne({"_id":nId}).exec((err,data) =>{
            if (err) {
                //res.send(err);
                res.send({data:{},resCode:200,resMsg:'不存在该博客'});
            } else {
                models.Blog.update({"_id":nId},{$set:{'read':data.read+1}},function(err,data){
                    if(err){
                        res.send({data:{},resCode:200,resMsg:'不存在该博客'});
                    }
                })
                res.send({data,resCode:100,resMsg:''});
            }
        })
    }catch(e){
        console.log(e)
    }
})
//修改博客
router.post('/api/changeBlog',(req,res) =>{//参数有nid,blogTit,blogCont,tag
    try{
        //存储日期
        let date = new Date();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + '年' + month + '月' + strDate
                + "日" + date.getHours() + ":" + date.getMinutes();
        let newAccount={
            blogTit:req.body.blogTit,
            blogCont:req.body.blogCont,
            blogContHtml:req.body.blogContHtml,
            time:currentdate,
            draft:0,//不是草稿
            read:0,
            tag:req.body.tag,
        }
        console.log(req.body.tag);
        //存入数据库
        models.Blog.update({'_id':req.body.nId},{$set:newAccount},function(err,data){
            if(err){
                res.send({data:{},resCode:200,resMsg:'请求失败'})
            }else{
                res.send({data,resCode:100,resMsg:'请求成功'});
            }
        })
    }catch(e){
        console.log(e)
    }

})
//删除博客
router.post('/api/deleteBlog',(req,res) =>{//参数有nid,blogTit,blogCont,tag
    try{
        //删除数据
        models.Blog.remove({'_id':req.body.nId},function(err,data){
            if(err){
                res.send({data:{},resCode:200,resMsg:'请求失败'})
            }else{
                res.send({data,resCode:100,resMsg:'请求成功'});
            }
        })
    }catch(e){
        console.log(e)
    }
})
//查询,搜索博客列表
router.get('/api/getBlogList',(req,res) => {
    try{
        // console.log(typeof(req.query.limit));
        let limit=parseInt(req.query.limit);
        let pageNum=parseInt(req.query.pageNum);
        console.log(req.query.search);
        let tiaoJian={'draft':0};
        if(req.query.search!=''){
            tiaoJian.tag=req.query.search
        }
        models.Blog.find(tiaoJian).limit(limit).skip(limit*(pageNum-1)).exec((err,data) => {
            if (err) {
                res.send({data:{},resCode:200,resMsg:'请求失败'});
            } else {
                console.log(data.length);
                var num=data.length>req.query.limit?req.query.limit:data.length;
                for(var i=0;i<num;i++){
                    if(data[i].blogTit.length>28){
                        data[i].blogTit=(data[i].blogTit).substring(0,28)+'…';
                    }
                    if(data[i].blogCont.length>100){
                        data[i].blogCont=(data[i].blogCont).substring(0,100)+'…';
                    }
                }
                res.send({data,resCode:100,resMsg:'请求成功'});
            }
        });
    }catch(e){
        console.log(e)
    }
});
//按标签搜索
router.get('/api/search',(req,res) =>{
    try{
        console.log('###');
        console.log(req.query.search);
        models.Blog.find({'tag':req.query.search},function(err,data){
            if(err){
                res.send({data:{},resCode:200,resMsg:'未搜到相关内容'})
            }else{
                if(data==null||data.length==0){
                    res.send({data:{},resCode:100,resMsg:'未搜到相关内容'});
                }else{
                    res.send({data,resCode:100,resMsg:'请求成功'});
                }
            }
        })
    }catch(e){
        console.log(e)
    }
})
//博客草稿自动保存
router.post('/api/draft',(req,res) =>{
    try{
        let newAccount={
            blogTit:req.body.blogTit,
            blogCont:req.body.blogCont,
            blogContHtml:req.body.blogContHtml,
            draft:1,//是草稿
            tag:req.body.tag
        }
        console.log(req.body.tag);
        //存入数据库
        models.Blog.findOne({"draft":1}).exec((err,data) =>{
            if(err){
                console.log('没找到');
                res.send({data:{},resCode:200,resMsg:'失败'});
            }else{
                console.log(data);
                if(data==null){
                    new models.Blog(newAccount).save(function(err,data){
                        if (err) {
                            res.send({data:{},resCode:200,resMsg:'失败'});
                        }else {
                            res.send({data,resCode:100,resMsg:'请求成功没找到'});
                        }
                    })
                }else{
                    models.Blog.update({"draft":1},{$set:newAccount},function(err,data){
                        console.log(data);
                        if(err){
                            res.send({data:{},resCode:200,resMsg:'不存在该博客'});
                        }else{
                            res.send({data:{},resCode:100,resMsg:'请求成功找到了'});
                        }
                    })
                }
                
            }
        })
        
        
    }catch(e){
        console.log(e)
    }

})
//查询草稿
router.get('/api/getDraftInfo',(req,res) =>{
    try{
        models.Blog.findOne({"draft":1}).exec((err,data) =>{
            if (err) {
                res.send({data:{},resCode:200,resMsg:'请求失败'});
            } else {
                if(data!=null){
                    res.send({data,resCode:100,resMsg:'请求成功'});
                }else{
                    res.send({data:{},resCode:200,resMsg:'请求成功'});
                }
            }
        })
    }catch(e){
        console.log(e)
    }
})
module.exports = router;