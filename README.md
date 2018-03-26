# vue-blog
vue-blog 是由node做后端服务器开发接口，mongodb做数据库，vue处理前端的简单单页面博客。
包含管理员及游客两个角色，管理员可以操作博客的编辑和增删改查，游客只可浏览。
博客内容包括标题，固定标签，自定义标签，编辑时间，浏览次数，博客内容
# 目录描述
- `build` - dev server 目录，包括webpack等
- `server` - 后端接口及数据连接
- `package.json` - npm 依赖列表.
- `src` - vue前端页面及静态资源
- `index.html` - vue入口文件

# 安装及运行
1. 下载mongodb并安装
2. 创建数据目录，MongoDB将数据目录存储在 db 目录下。但是这个数据目录不会主动创建，我们在安装完成后需要创建它。
第一步和第二部可参考 http://www.runoob.com/mongodb/mongodb-window-install.html
3. 启动mongodb数据库
4. 项目下载好之后，进入项目目录vueBlogPage文件夹内，在控制台或终端打 npm install 回车安装依赖
5. 进入vueBlogPage/server文件夹，运行node index.js  启动接口的node服务器
6. 在项目vueBlogPage目录下，运行npm run dev即可看到项目运行
7. 在页面底部的Copyright ©2017 连续单击五次即可弹出管理员登陆框，进行管理员操作
8. 管理员用户名：18600000000  密码：123456



