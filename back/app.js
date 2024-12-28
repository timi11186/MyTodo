// 引入必要的模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 cors 中间件用于处理跨域请求
var cors = require('cors');

// 引入路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用各种中间件
app.use(logger('dev')); // 日志记录
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: false })); // 解析 URL 编码的请求体
app.use(cookieParser()); // 解析 cookie
app.use(express.static(path.join(__dirname, 'public'))); // 提供静态文件服务

// CORS 配置选项
const corsOptions = {
  // 允许访问的前端域名列表
  // 目前允许两个本地开发环境的地址访问
  origin: ['http://localhost:3456', 'http://localhost:3000'],
  
  // 允许的 HTTP 请求方法，包括：
  // - GET: 获取数据
  // - POST: 创建数据
  // - PUT: 更新数据
  // - DELETE: 删除数据
  // - OPTIONS: 预检请求
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  
  // 允许前端请求中携带的头部信息
  // - Content-Type: 指定请求体格式（如 application/json）
  // - Authorization: 用于携带身份验证信息（如 JWT token）
  allowedHeaders: ['Content-Type', 'Authorization'],
  
  // 允许前端发送凭证信息（如 cookies）
  credentials: true
};

// 应用 CORS 中间件到整个应用
app.use(cors(corsOptions));

// 设置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 全局错误处理中间件
app.use(function(err, req, res, next) {
  // 设置错误信息，仅在开发环境显示详细错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 手动设置 CORS 响应头
  // 注意：这部分配置可能与上面的 cors 中间件冲突
  // 建议移除这些手动设置的头部
  res.header('Access-Control-Allow-Origin', '*');  // 允许所有域名访问
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // JWT token 验证
  // 从请求头中获取 token 并验证
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
  }

  // 返回错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
