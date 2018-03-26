// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
//mongoose.connect('mongodb://judelife.com/test5');
mongoose.connect('mongodb://10.11.30.242/test5');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('openUri',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
    phone : String,
    password : String
});
const blogSchema = mongoose.Schema({
    blogTit : String,
    blogCont : String,
    blogContHtml: String,
    time : String,
    draft:Number,//0不是草稿，1是草稿
    tag :Array,//博客标签
    read : Number//阅读人数
});
/************** 定义模型Model **************/
const Models = {
    Login : mongoose.model('Login',loginSchema),
    Blog : mongoose.model('Blog',blogSchema)
}

module.exports = Models;