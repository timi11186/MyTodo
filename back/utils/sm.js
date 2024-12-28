const sm2 = require('sm-crypto').sm2
const fs = require('fs');
let keypair = sm2.generateKeyPairHex()

publicKey = keypair.publicKey // 公钥
privateKey = keypair.privateKey // 私钥



// 默认生成公钥 130 位太长，可以压缩公钥到 66 位
const compressedPublicKey = sm2.compressPublicKeyHex(publicKey) // compressedPublicKey 和 publicKey 等价
const isSame = sm2.comparePublicKeyHex(publicKey, compressedPublicKey) // 判断公钥是否等价

// 写入json
fs.writeFileSync('./json/key.json', JSON.stringify({ publicKey, privateKey, compressedPublicKey }));

// let verifyResult = sm2.verifyPublicKey(publicKey) // 验证公钥
// verifyResult = sm2.verifyPublicKey(compressedPublicKey) // 验证公钥