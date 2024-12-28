 function Message(code,message,data){
    return JSON.stringify({
        code,
        message,
        data,
    })
}

module.exports = { Message };