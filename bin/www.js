// 本文件记录服务器相关代码
// 创建服务器

const http = require('http');

const serverHandler = require('../app');

const PORT = 5000;

// 为了方便维护，将createServer()的回调函数放在根目录下的app.js中
const server = http.createServer(serverHandler);

server.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});

// 启动命令：npm run dev