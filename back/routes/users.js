var express = require('express');
var router = express.Router();

var JWT = require('../utils/JWT');
var { Message } = require('../utils/commit');

// token验证中间件
const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.write(Message(401, '未提供token'));
        res.end();
        return;
    }

    const result = JWT.verifyToken(token);
    if (result.code !== 200) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.write(Message(401, result.message));
        res.end();
        return;
    }

    req.user = result.data; // 将解码后的用户信息存储到请求对象中
    
    next();
};

/* GET users listing. */
router.get('/', verifyToken, function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(Message(200, '获取成功', req.user));
    res.end();
});

router.post('/register', function (req, res, next) {
    const { username, password } = req.body;
    const token = JWT.createToken({ username, password });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(Message(200, '注册成功', token));
    res.end();
});

router.post('/login',function (req, res, next) {
    const { username, password } = req.body;
    const token = JWT.createToken({ username, password });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(Message(200, '登录成功', token));
    res.end();
});

// 登出接口
router.post('/logout', function (req, res, next) {
    const token = req.headers.authorization;
    JWT.removeToken(token);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(Message(200, '登出成功'));
    res.end();
});

// 获取用户信息接口
router.get('/info', verifyToken, function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(Message(200, '获取成功', req.user));
    res.end();
});

module.exports = router;
