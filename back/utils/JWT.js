const jwt = require('jsonwebtoken');
const secretKey = 'test123456'; // 密钥

// 使用 Set 来存储有效的 token
const tokenList = new Set();

// 使用 Map 存储用户和 token 的对应关系
const userTokenMap = new Map();

const JWT = {
    // 创建 token
    createToken(payload) {
        const { username } = payload;

        // 如果该用户已有 token，先删除旧的
        const oldToken = userTokenMap.get(username);
        if (oldToken) {
            tokenList.delete(oldToken);
        }

        // 生成新 token
        const token = jwt.sign(payload, secretKey, { expiresIn: '3d' });

        // 更新用户的 token
        tokenList.add(token);
        userTokenMap.set(username, token);

        return token;
    },

    // 验证 token
    verifyToken(token) {
        try {
            // 首先检查 token 是否在 Set 中存在
            if (!tokenList.has(token)) {
                return {
                    code: 401,
                    message: 'token不存在或已失效'
                };
            }

            // 验证 token 的有效性
            const decoded = jwt.verify(token, secretKey);
            return {
                code: 200,
                message: 'token验证成功',
                data: decoded  // 解码后的用户信息
            };
        } catch (error) {
            // 如果 token 过期，从 Set 中删除
            tokenList.delete(token);
            return {
                code: 401,
                message: 'token已过期',
                error: error.message
            };
        }
    },

    // 删除 token（用于登出）
    removeToken(token) {
        return tokenList.delete(token);
    }
}

module.exports = JWT;